CREATE TABLE public.chat_rate_limits (
  bucket_key text PRIMARY KEY,
  hits integer NOT NULL DEFAULT 0,
  expires_at timestamptz NOT NULL
);
REVOKE ALL ON public.chat_rate_limits FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.chat_rate_limits TO service_role;
ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.consume_chat_quota(client_key text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE global_hits integer; client_hits integer; current_window bigint;
BEGIN
  IF client_key !~ '^[a-f0-9]{64}$' THEN RAISE EXCEPTION 'Invalid key'; END IF;
  DELETE FROM public.chat_rate_limits WHERE expires_at < now() - interval '1 day';
  INSERT INTO public.chat_rate_limits(bucket_key, hits, expires_at)
    VALUES ('global:' || to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD'), 1, date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' + interval '1 day')
    ON CONFLICT (bucket_key) DO UPDATE SET hits = chat_rate_limits.hits + 1
    RETURNING hits INTO global_hits;
  IF global_hits > 100 THEN RETURN false; END IF;
  current_window := floor(extract(epoch FROM now()) / 600);
  INSERT INTO public.chat_rate_limits(bucket_key, hits, expires_at)
    VALUES (client_key || ':' || current_window, 1, to_timestamp((current_window + 1) * 600))
    ON CONFLICT (bucket_key) DO UPDATE SET hits = chat_rate_limits.hits + 1
    RETURNING hits INTO client_hits;
  RETURN client_hits <= 12;
END; $$;
REVOKE ALL ON FUNCTION public.consume_chat_quota(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_chat_quota(text) TO service_role;