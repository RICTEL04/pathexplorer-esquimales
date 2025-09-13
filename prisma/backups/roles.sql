
\restrict cCnZ8fWJgveEf6wtWQNCzfWu1ko3juUa8LCNV8fXbfaZbYLz8FBXW8WR9cPFQXu

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

ALTER ROLE "anon" SET "statement_timeout" TO '3s';

ALTER ROLE "authenticated" SET "statement_timeout" TO '8s';

ALTER ROLE "authenticator" SET "statement_timeout" TO '8s';

\unrestrict cCnZ8fWJgveEf6wtWQNCzfWu1ko3juUa8LCNV8fXbfaZbYLz8FBXW8WR9cPFQXu

RESET ALL;
