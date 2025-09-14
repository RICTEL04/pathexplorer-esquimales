
\restrict 8GOr0KUox1goe0KQl9UdIS4mge1DNBM9NmdnKp4h2V0rIdcQKe2oPZ5SP0bABA0

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

ALTER ROLE "anon" SET "statement_timeout" TO '3s';

ALTER ROLE "authenticated" SET "statement_timeout" TO '8s';

ALTER ROLE "authenticator" SET "statement_timeout" TO '8s';

\unrestrict 8GOr0KUox1goe0KQl9UdIS4mge1DNBM9NmdnKp4h2V0rIdcQKe2oPZ5SP0bABA0

RESET ALL;
