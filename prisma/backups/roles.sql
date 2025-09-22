
\restrict p3k6FiF9kRn2yEBgbKCtFafVuJweA03rtzfDaokBZ6R64OeDlYw5ZLBIQblKL0R

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

ALTER ROLE "anon" SET "statement_timeout" TO '3s';

ALTER ROLE "authenticated" SET "statement_timeout" TO '8s';

ALTER ROLE "authenticator" SET "statement_timeout" TO '8s';

\unrestrict p3k6FiF9kRn2yEBgbKCtFafVuJweA03rtzfDaokBZ6R64OeDlYw5ZLBIQblKL0R

RESET ALL;
