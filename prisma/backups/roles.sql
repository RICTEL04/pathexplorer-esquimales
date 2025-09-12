
\restrict kRB5CB2k24ggYFn1NvAYCecZ0euarnqf9g9Tw9vVT4LFsXQd2QCdC2c8DdCIwxg

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

ALTER ROLE "anon" SET "statement_timeout" TO '3s';

ALTER ROLE "authenticated" SET "statement_timeout" TO '8s';

ALTER ROLE "authenticator" SET "statement_timeout" TO '8s';

\unrestrict kRB5CB2k24ggYFn1NvAYCecZ0euarnqf9g9Tw9vVT4LFsXQd2QCdC2c8DdCIwxg

RESET ALL;
