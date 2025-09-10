
\restrict n04pY8XpsGDyqs0OdlY4FzDwf9NgSFguSUkDw6gyxbfwU9y1AZlkgp1xO8yO6IZ

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

ALTER ROLE "anon" SET "statement_timeout" TO '3s';

ALTER ROLE "authenticated" SET "statement_timeout" TO '8s';

ALTER ROLE "authenticator" SET "statement_timeout" TO '8s';

\unrestrict n04pY8XpsGDyqs0OdlY4FzDwf9NgSFguSUkDw6gyxbfwU9y1AZlkgp1xO8yO6IZ

RESET ALL;
