
\restrict ruGpaTcyrj2RqTvPl0lFJhoihfHM4chvyWl7ygq4y8BPId45zsRWz5TAdQ9DMyb

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

ALTER ROLE "anon" SET "statement_timeout" TO '3s';

ALTER ROLE "authenticated" SET "statement_timeout" TO '8s';

ALTER ROLE "authenticator" SET "statement_timeout" TO '8s';

\unrestrict ruGpaTcyrj2RqTvPl0lFJhoihfHM4chvyWl7ygq4y8BPId45zsRWz5TAdQ9DMyb

RESET ALL;
