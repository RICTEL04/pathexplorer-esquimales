SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
00000000-0000-0000-0000-000000000000	c75d1686-cb7e-4a38-9bab-a4992b9244fe	{"action":"user_confirmation_requested","actor_id":"042aeca7-3524-4219-bfab-70cc20c5ef50","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-03 04:06:32.497189+00	
00000000-0000-0000-0000-000000000000	b32e9982-7a4c-4651-aa69-74a9aa05ace4	{"action":"user_confirmation_requested","actor_id":"0389c6c9-da35-4cce-b72a-bef52dbbb044","actor_username":"rikytellez04@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-03 04:37:07.024608+00	
00000000-0000-0000-0000-000000000000	5fd98b4e-482b-4a5a-8831-ed75ac0df22a	{"action":"user_confirmation_requested","actor_id":"593dd4d3-a8d6-44f1-98bb-137d838d3f7d","actor_username":"rikytellez04@hotmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-03 04:47:56.174506+00	
00000000-0000-0000-0000-000000000000	b362f263-5661-4c84-a927-0c7594aa404b	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01741300@tec.mx","user_id":"042aeca7-3524-4219-bfab-70cc20c5ef50","user_phone":""}}	2025-04-03 06:21:48.521342+00	
00000000-0000-0000-0000-000000000000	c5eb5207-38e9-47b6-abf5-efee6860c06f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rikytellez04@hotmail.com","user_id":"593dd4d3-a8d6-44f1-98bb-137d838d3f7d","user_phone":""}}	2025-04-03 06:21:48.559606+00	
00000000-0000-0000-0000-000000000000	f8591825-b2ef-4747-87d5-b56d05deac3f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rikytellez04@gmail.com","user_id":"0389c6c9-da35-4cce-b72a-bef52dbbb044","user_phone":""}}	2025-04-03 06:21:48.564313+00	
00000000-0000-0000-0000-000000000000	add5eb79-e8b3-4a59-9713-8185dba363b2	{"action":"user_signedup","actor_id":"ecdca837-6a64-41a9-9642-196ffac92612","actor_username":"rikytellez04@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 06:22:53.614762+00	
00000000-0000-0000-0000-000000000000	253ff4fc-5e57-4e7c-8619-1cf9d5dbfc2b	{"action":"login","actor_id":"ecdca837-6a64-41a9-9642-196ffac92612","actor_username":"rikytellez04@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 06:22:53.61993+00	
00000000-0000-0000-0000-000000000000	b494e27a-c46f-4e34-b107-5359469280f0	{"action":"user_signedup","actor_id":"b981070a-9f76-4c13-b052-55b208d3ffaa","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 06:23:39.26224+00	
00000000-0000-0000-0000-000000000000	2e017b41-8ddc-442c-9e91-32d808727238	{"action":"login","actor_id":"b981070a-9f76-4c13-b052-55b208d3ffaa","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 06:23:39.266357+00	
00000000-0000-0000-0000-000000000000	4c6f39b0-4ca0-42ca-b036-f555c37dd93e	{"action":"login","actor_id":"b981070a-9f76-4c13-b052-55b208d3ffaa","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 06:24:50.575594+00	
00000000-0000-0000-0000-000000000000	2af37236-742a-4941-b3de-a4eaa071f143	{"action":"user_signedup","actor_id":"31f3a821-66c2-42eb-8def-2880197e8a7d","actor_username":"rikytellez04@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 06:26:33.260369+00	
00000000-0000-0000-0000-000000000000	0956fabd-21d7-4a02-a357-58cda0a0b813	{"action":"login","actor_id":"31f3a821-66c2-42eb-8def-2880197e8a7d","actor_username":"rikytellez04@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 06:26:33.265544+00	
00000000-0000-0000-0000-000000000000	e612b44d-d01a-4407-b581-d7f4950d6d3a	{"action":"user_repeated_signup","actor_id":"b981070a-9f76-4c13-b052-55b208d3ffaa","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-03 06:27:53.820946+00	
00000000-0000-0000-0000-000000000000	b9827fd7-5d82-4dab-b3ea-1271a659d01e	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01741300@tec.mx","user_id":"b981070a-9f76-4c13-b052-55b208d3ffaa","user_phone":""}}	2025-04-03 06:28:54.005874+00	
00000000-0000-0000-0000-000000000000	da0c59cc-3558-4dc2-af00-1cc7d59df9d9	{"action":"user_signedup","actor_id":"986949c4-8f1b-4005-9aa1-5e6e36eebc0c","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 06:28:58.338308+00	
00000000-0000-0000-0000-000000000000	c35539b0-7f40-43c6-a190-dd56d101436d	{"action":"login","actor_id":"986949c4-8f1b-4005-9aa1-5e6e36eebc0c","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 06:28:58.341586+00	
00000000-0000-0000-0000-000000000000	5d23bc82-511e-4d25-8db7-d8eca7c597e5	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01741300@tec.mx","user_id":"986949c4-8f1b-4005-9aa1-5e6e36eebc0c","user_phone":""}}	2025-04-03 06:34:43.59754+00	
00000000-0000-0000-0000-000000000000	3f44a216-52b5-45d1-8680-d483d04bde8c	{"action":"user_signedup","actor_id":"88cb4e0c-a606-468d-a1c8-50b46aa9f9da","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 06:34:48.649261+00	
00000000-0000-0000-0000-000000000000	fb7d54a4-65dc-4224-ab0d-4da7f87c8124	{"action":"login","actor_id":"88cb4e0c-a606-468d-a1c8-50b46aa9f9da","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 06:34:48.65305+00	
00000000-0000-0000-0000-000000000000	a18e74d6-cfd6-43e0-8f68-2536228aa015	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01741300@tec.mx","user_id":"88cb4e0c-a606-468d-a1c8-50b46aa9f9da","user_phone":""}}	2025-04-03 06:39:54.645343+00	
00000000-0000-0000-0000-000000000000	43c10734-7474-40b4-a7ec-0b8966ff1194	{"action":"user_signedup","actor_id":"fea613dd-011e-46a7-b4fa-dc17494fbb2a","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 06:39:59.60605+00	
00000000-0000-0000-0000-000000000000	c2931d7b-b9d2-407e-99dc-f84c6c716a68	{"action":"login","actor_id":"fea613dd-011e-46a7-b4fa-dc17494fbb2a","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 06:39:59.610611+00	
00000000-0000-0000-0000-000000000000	8b1c9e20-fd77-4ee0-b1dd-dc5364355377	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01741300@tec.mx","user_id":"fea613dd-011e-46a7-b4fa-dc17494fbb2a","user_phone":""}}	2025-04-03 06:43:19.638028+00	
00000000-0000-0000-0000-000000000000	41333d3c-c9e7-4ca2-a710-30b57d8715f8	{"action":"user_signedup","actor_id":"26f241fd-ca79-4886-a909-3a10e5daadee","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 06:43:23.150103+00	
00000000-0000-0000-0000-000000000000	61f0c141-9bb8-4b02-b140-7abadefe28c2	{"action":"login","actor_id":"26f241fd-ca79-4886-a909-3a10e5daadee","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 06:43:23.15374+00	
00000000-0000-0000-0000-000000000000	800d0baa-543f-43bd-92fd-ff6ce7bff806	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01741300@tec.mx","user_id":"26f241fd-ca79-4886-a909-3a10e5daadee","user_phone":""}}	2025-04-03 07:23:12.715895+00	
00000000-0000-0000-0000-000000000000	e540ecbb-a55f-4772-961d-cbc43aad5113	{"action":"user_signedup","actor_id":"5d031a01-2757-45e5-9f94-777f3a239609","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 07:23:16.564357+00	
00000000-0000-0000-0000-000000000000	7177fefc-a740-4010-a703-6bd6dda34329	{"action":"login","actor_id":"5d031a01-2757-45e5-9f94-777f3a239609","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 07:23:16.568778+00	
00000000-0000-0000-0000-000000000000	56734715-c83e-4b7f-9419-f528b999d778	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01741300@tec.mx","user_id":"5d031a01-2757-45e5-9f94-777f3a239609","user_phone":""}}	2025-04-03 07:25:57.560678+00	
00000000-0000-0000-0000-000000000000	eb1ca5a6-b47f-4c12-aa44-7255c4eaf155	{"action":"user_signedup","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 07:26:01.056394+00	
00000000-0000-0000-0000-000000000000	ad0dbb05-5ded-4859-8ebb-baddb590f3b5	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 07:26:01.060638+00	
00000000-0000-0000-0000-000000000000	43cd375e-5560-4cd5-8055-114290d07d24	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-03 08:42:16.644039+00	
00000000-0000-0000-0000-000000000000	164e4837-9bed-48be-a83b-8ab657fe2dc0	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-03 08:42:16.646738+00	
00000000-0000-0000-0000-000000000000	0b15107e-7983-48e5-9ad1-a00793130e5f	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 08:43:31.544933+00	
00000000-0000-0000-0000-000000000000	98ced393-7f1b-48bc-b81f-679e8b56394a	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 08:43:34.050686+00	
00000000-0000-0000-0000-000000000000	6247238d-9b51-4556-adb9-8657b8f952d3	{"action":"login","actor_id":"ecdca837-6a64-41a9-9642-196ffac92612","actor_username":"rikytellez04@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 08:49:18.616948+00	
00000000-0000-0000-0000-000000000000	a353d1f1-9ff4-45b2-bd04-0679b6d10efc	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 08:51:35.476391+00	
00000000-0000-0000-0000-000000000000	08de81cd-411d-4b92-bb33-766543a22426	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-03 19:43:34.309185+00	
00000000-0000-0000-0000-000000000000	bab53e74-80d8-41b3-aeec-691b6139ec8b	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-03 19:43:34.320664+00	
00000000-0000-0000-0000-000000000000	a371c961-a3e2-4c5f-96bd-ea46af867138	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 19:46:14.090242+00	
00000000-0000-0000-0000-000000000000	3616af29-1cbb-4fe0-b5b3-43bb05fb1b08	{"action":"user_signedup","actor_id":"b47428a9-2529-4a4a-b02f-5c42648e88a9","actor_username":"a@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-03 19:47:21.356969+00	
00000000-0000-0000-0000-000000000000	aac74e1f-8b85-40f8-b756-2caddafb4b45	{"action":"login","actor_id":"b47428a9-2529-4a4a-b02f-5c42648e88a9","actor_username":"a@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 19:47:21.367932+00	
00000000-0000-0000-0000-000000000000	f767aaff-b1b5-4614-ba78-46994999ac13	{"action":"token_refreshed","actor_id":"b47428a9-2529-4a4a-b02f-5c42648e88a9","actor_username":"a@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-03 21:56:20.650668+00	
00000000-0000-0000-0000-000000000000	fd58f4d0-b452-419a-9bca-38457c9e92c9	{"action":"token_revoked","actor_id":"b47428a9-2529-4a4a-b02f-5c42648e88a9","actor_username":"a@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-03 21:56:20.659448+00	
00000000-0000-0000-0000-000000000000	9b61ce06-cc4d-489a-8cf5-d9d5afe6ebce	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jorgebcarriles@outlook.com","user_id":"c0534a2b-cecc-444e-99a4-acb9f7eca6de","user_phone":""}}	2025-04-03 22:04:30.433202+00	
00000000-0000-0000-0000-000000000000	45069b80-716a-42cd-a940-7ecb18cd1959	{"action":"user_recovery_requested","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"user"}	2025-04-03 22:39:40.885915+00	
00000000-0000-0000-0000-000000000000	7cb0e2f2-24d7-416b-88ca-2ce390dfa01a	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account"}	2025-04-03 22:40:25.187676+00	
00000000-0000-0000-0000-000000000000	4e8e87fe-a8c0-4c90-a5df-6aa5319985f6	{"action":"token_refreshed","actor_id":"b47428a9-2529-4a4a-b02f-5c42648e88a9","actor_username":"a@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-03 22:55:03.186907+00	
00000000-0000-0000-0000-000000000000	31a46590-c960-479c-8d2a-0e46be7d5594	{"action":"token_revoked","actor_id":"b47428a9-2529-4a4a-b02f-5c42648e88a9","actor_username":"a@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-03 22:55:03.190199+00	
00000000-0000-0000-0000-000000000000	c9a8100e-392b-497a-8539-f7253be39b48	{"action":"user_recovery_requested","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"user"}	2025-04-03 23:31:33.020485+00	
00000000-0000-0000-0000-000000000000	06f46466-7556-418d-bb23-796e643666ef	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account"}	2025-04-03 23:31:41.962501+00	
00000000-0000-0000-0000-000000000000	34e3dd31-6267-4a5e-a486-b261efd5b125	{"action":"user_updated_password","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"user"}	2025-04-03 23:31:57.014314+00	
00000000-0000-0000-0000-000000000000	c1ce095c-0231-4cd7-afe6-f9f43b9e4150	{"action":"user_modified","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"user"}	2025-04-03 23:31:57.015048+00	
00000000-0000-0000-0000-000000000000	f8cf986a-a831-4bad-9278-4e5193b6b61e	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 23:34:07.034992+00	
00000000-0000-0000-0000-000000000000	8de43633-3162-48d7-ae1f-5db915189ca7	{"action":"user_recovery_requested","actor_id":"ecdca837-6a64-41a9-9642-196ffac92612","actor_username":"rikytellez04@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-04-03 23:35:16.644692+00	
00000000-0000-0000-0000-000000000000	baae1964-c25b-420e-9a94-e5dae47685f1	{"action":"login","actor_id":"ecdca837-6a64-41a9-9642-196ffac92612","actor_username":"rikytellez04@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-04-03 23:35:30.814522+00	
00000000-0000-0000-0000-000000000000	9502a413-9431-40ba-81bc-587c4e8e80b3	{"action":"user_updated_password","actor_id":"ecdca837-6a64-41a9-9642-196ffac92612","actor_username":"rikytellez04@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-04-03 23:35:42.957094+00	
00000000-0000-0000-0000-000000000000	2763061c-032c-4587-abea-9fd2fd2b0f39	{"action":"user_modified","actor_id":"ecdca837-6a64-41a9-9642-196ffac92612","actor_username":"rikytellez04@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-04-03 23:35:42.957739+00	
00000000-0000-0000-0000-000000000000	188ab088-ffc3-459f-bc6f-2fe34bd66f46	{"action":"login","actor_id":"ecdca837-6a64-41a9-9642-196ffac92612","actor_username":"rikytellez04@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-03 23:36:09.869837+00	
00000000-0000-0000-0000-000000000000	61895b8f-12c8-4e54-a04d-bde9fc4fdbc5	{"action":"user_recovery_requested","actor_id":"c0534a2b-cecc-444e-99a4-acb9f7eca6de","actor_username":"jorgebcarriles@outlook.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 00:04:23.457085+00	
00000000-0000-0000-0000-000000000000	ff701b4c-8e4e-4b2f-876c-36eb65a1d115	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01198676@tec.mx","user_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","user_phone":""}}	2025-04-04 00:05:14.080689+00	
00000000-0000-0000-0000-000000000000	5df44f54-2cd5-41fa-aefe-54baa022e250	{"action":"user_recovery_requested","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"user"}	2025-04-04 00:05:21.503164+00	
00000000-0000-0000-0000-000000000000	e7de6bed-3594-47f4-bb41-b4a3300157ba	{"action":"login","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"account"}	2025-04-04 00:05:38.969911+00	
00000000-0000-0000-0000-000000000000	6b204b7c-5d50-4fe7-9f10-4a12cc14d196	{"action":"user_recovery_requested","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"user"}	2025-04-04 00:06:43.820736+00	
00000000-0000-0000-0000-000000000000	a811e689-f0ea-4c3d-9eab-b0f4448621b0	{"action":"login","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"account"}	2025-04-04 00:07:02.965594+00	
00000000-0000-0000-0000-000000000000	803050f2-cef1-44c3-8081-7fc385ab905b	{"action":"user_signedup","actor_id":"5314bfcf-8401-457f-b7a7-2221ea64777c","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-04 00:22:35.986903+00	
00000000-0000-0000-0000-000000000000	a1592fe2-5fee-4eeb-92a9-661fea3508ea	{"action":"login","actor_id":"5314bfcf-8401-457f-b7a7-2221ea64777c","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 00:22:35.997684+00	
00000000-0000-0000-0000-000000000000	e15cfec7-75cf-4316-9e3b-0a3bb47a816e	{"action":"user_recovery_requested","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"user"}	2025-04-04 00:29:04.174029+00	
00000000-0000-0000-0000-000000000000	d178669a-f480-4abb-b778-150474d56dee	{"action":"login","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"account"}	2025-04-04 00:29:14.800589+00	
00000000-0000-0000-0000-000000000000	6510fdc8-0d5b-403b-b024-9b2fd13cd895	{"action":"user_updated_password","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"user"}	2025-04-04 00:29:32.500146+00	
00000000-0000-0000-0000-000000000000	660a6f03-4e90-4bd3-9767-bb6c291e03e6	{"action":"user_modified","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"user"}	2025-04-04 00:29:32.500781+00	
00000000-0000-0000-0000-000000000000	6370568f-3868-47b8-aa18-62a491b2f910	{"action":"login","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 00:30:29.008602+00	
00000000-0000-0000-0000-000000000000	997df01f-bb32-4ced-96d8-6742e6fccaaa	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 04:32:33.660388+00	
00000000-0000-0000-0000-000000000000	4e580d50-64ed-48a5-ad2d-7e6ed9db0dd2	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 04:32:33.661923+00	
00000000-0000-0000-0000-000000000000	a2572c9c-a4aa-4db9-9085-4f88dd7ca41f	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 05:30:35.45293+00	
00000000-0000-0000-0000-000000000000	2aeadb9c-aee4-4191-93bb-42b5e9602b2f	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 05:30:35.45549+00	
00000000-0000-0000-0000-000000000000	1cb5922e-309f-41ab-9d0a-24c31f4b9c1f	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 06:31:05.260935+00	
00000000-0000-0000-0000-000000000000	2d3812a6-7f14-435f-af92-d126501fa5c3	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 06:31:05.263757+00	
00000000-0000-0000-0000-000000000000	ba674179-fd35-4245-ba31-60e52162dbe1	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 08:03:10.159802+00	
00000000-0000-0000-0000-000000000000	76f38012-2517-4549-8a4a-8d71140486a7	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 08:03:10.167694+00	
00000000-0000-0000-0000-000000000000	95ac79cc-4c1b-4e8e-89b2-3749f6d8de22	{"action":"login","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 08:03:29.665294+00	
00000000-0000-0000-0000-000000000000	14cef959-0a7a-40b6-b979-ab7deb938b3f	{"action":"login","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 08:37:41.628575+00	
00000000-0000-0000-0000-000000000000	aabe043c-a90c-48ec-9fa3-26866e340e32	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 09:36:23.547169+00	
00000000-0000-0000-0000-000000000000	6b7cb9b6-6701-4a53-bc5f-4f9f23619b77	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 09:36:23.557976+00	
00000000-0000-0000-0000-000000000000	c97366bc-5e13-4c17-a0da-78bcda79b939	{"action":"token_refreshed","actor_id":"5314bfcf-8401-457f-b7a7-2221ea64777c","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 19:39:09.994673+00	
00000000-0000-0000-0000-000000000000	34c5d1e2-c378-4e57-9d1f-877a55a8fcc7	{"action":"token_revoked","actor_id":"5314bfcf-8401-457f-b7a7-2221ea64777c","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 19:39:10.010284+00	
00000000-0000-0000-0000-000000000000	420af974-2e8e-43a7-8f67-6d40b5a1f19b	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 19:40:52.558839+00	
00000000-0000-0000-0000-000000000000	c1c16333-a0a3-4394-94bc-b44968fb60f2	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 21:00:30.556439+00	
00000000-0000-0000-0000-000000000000	67bc2cea-339a-4382-b908-4f9214640a81	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-04 21:00:30.563022+00	
00000000-0000-0000-0000-000000000000	7640ab66-8265-4cd8-9f93-5db6a6fe9a5c	{"action":"user_signedup","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-04 21:08:41.012862+00	
00000000-0000-0000-0000-000000000000	82b68d98-be54-43d7-9069-3e899dcd7e6a	{"action":"login","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 21:08:41.020592+00	
00000000-0000-0000-0000-000000000000	b58dbee3-191d-436f-bd29-44cb463ead69	{"action":"user_signedup","actor_id":"17be3a68-8d97-4557-85e8-8e8cc9ecbc13","actor_username":"davidminirey04@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-04 21:09:21.549173+00	
00000000-0000-0000-0000-000000000000	344de839-efd5-48af-a6d6-a8c819e7fa09	{"action":"login","actor_id":"17be3a68-8d97-4557-85e8-8e8cc9ecbc13","actor_username":"davidminirey04@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 21:09:21.555611+00	
00000000-0000-0000-0000-000000000000	8348105f-0bf9-43dc-81a9-16795e2e43bf	{"action":"user_recovery_requested","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 21:09:34.383108+00	
00000000-0000-0000-0000-000000000000	61507e66-b1fa-4a7f-bfd0-7762ee6bba8f	{"action":"login","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-04-04 21:09:45.901653+00	
00000000-0000-0000-0000-000000000000	7ad30f5a-3193-46c7-8953-335c2f35a478	{"action":"user_updated_password","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 21:09:55.68458+00	
00000000-0000-0000-0000-000000000000	ee5e66d0-7e38-4903-ae07-f29558faab09	{"action":"user_modified","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 21:09:55.685249+00	
00000000-0000-0000-0000-000000000000	3df9aeeb-8819-4fc9-b688-b6904ffbb7c6	{"action":"login","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 21:10:08.112406+00	
00000000-0000-0000-0000-000000000000	f74faffc-bad3-490e-87b9-865404894360	{"action":"user_signedup","actor_id":"dee4835c-764c-40fb-bf0b-3bff8a0457d4","actor_username":"naranjilandia2004@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-04 22:40:28.568288+00	
00000000-0000-0000-0000-000000000000	34c45e86-d1ee-4396-96fc-fa4c5684c572	{"action":"login","actor_id":"dee4835c-764c-40fb-bf0b-3bff8a0457d4","actor_username":"naranjilandia2004@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 22:40:28.576449+00	
00000000-0000-0000-0000-000000000000	57067153-b7a1-47b2-b5e9-0170006ff7dc	{"action":"user_recovery_requested","actor_id":"dee4835c-764c-40fb-bf0b-3bff8a0457d4","actor_username":"naranjilandia2004@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 22:41:40.453881+00	
00000000-0000-0000-0000-000000000000	21486830-2d2b-407f-b798-692dfa7e917a	{"action":"login","actor_id":"dee4835c-764c-40fb-bf0b-3bff8a0457d4","actor_username":"naranjilandia2004@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-04-04 22:41:50.10037+00	
00000000-0000-0000-0000-000000000000	108715f8-68d8-4b21-bf8b-89c8ea0465d7	{"action":"user_updated_password","actor_id":"dee4835c-764c-40fb-bf0b-3bff8a0457d4","actor_username":"naranjilandia2004@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 22:41:58.115974+00	
00000000-0000-0000-0000-000000000000	e337389f-1e8c-4ea1-be70-096723fa9ed2	{"action":"user_modified","actor_id":"dee4835c-764c-40fb-bf0b-3bff8a0457d4","actor_username":"naranjilandia2004@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 22:41:58.116612+00	
00000000-0000-0000-0000-000000000000	5421e526-8b61-442c-828e-7a7efe8d90e7	{"action":"login","actor_id":"dee4835c-764c-40fb-bf0b-3bff8a0457d4","actor_username":"naranjilandia2004@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 22:42:21.386496+00	
00000000-0000-0000-0000-000000000000	9f40b0e9-77db-4064-a723-1d0fdc4d6ed1	{"action":"user_signedup","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-04 22:56:53.286409+00	
00000000-0000-0000-0000-000000000000	4cee22fb-d9bc-4a7e-adfa-914ce24e24ee	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 22:56:53.292922+00	
00000000-0000-0000-0000-000000000000	3b689a01-3138-4496-aab8-1f6ad0d43094	{"action":"user_recovery_requested","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 22:57:10.692553+00	
00000000-0000-0000-0000-000000000000	374213e0-d393-4781-9cae-dabd49072fbb	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account"}	2025-04-04 22:57:17.532965+00	
00000000-0000-0000-0000-000000000000	e073cb15-8143-4554-80da-df0d3d27fe06	{"action":"user_updated_password","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 22:57:24.942502+00	
00000000-0000-0000-0000-000000000000	0cba860e-dd41-4ff5-9bcc-2a9bfb17659f	{"action":"user_modified","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"user"}	2025-04-04 22:57:24.943168+00	
00000000-0000-0000-0000-000000000000	73045bcb-efac-447e-a202-88391b7fd4e2	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 22:57:33.036438+00	
00000000-0000-0000-0000-000000000000	0eb26e90-158b-4b7e-90d5-23e3d1873ec1	{"action":"user_signedup","actor_id":"9d6ddaee-5f7c-4cef-8705-6db6a8d11109","actor_username":"yi@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-04 23:08:43.131961+00	
00000000-0000-0000-0000-000000000000	e6bde056-05d4-465e-992d-6a43af3881cc	{"action":"login","actor_id":"9d6ddaee-5f7c-4cef-8705-6db6a8d11109","actor_username":"yi@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 23:08:43.137876+00	
00000000-0000-0000-0000-000000000000	d9e2a5e2-3c11-4afa-a60a-8bf662728986	{"action":"user_signedup","actor_id":"c3886a9b-c360-4fec-b16d-058747789ee2","actor_username":"xnhs@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-04 23:16:23.822249+00	
00000000-0000-0000-0000-000000000000	89406a64-9a0a-4ed5-ac5b-e02caa36b0be	{"action":"login","actor_id":"c3886a9b-c360-4fec-b16d-058747789ee2","actor_username":"xnhs@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 23:16:23.827872+00	
00000000-0000-0000-0000-000000000000	08bd4685-32a1-46a0-9610-d31088581938	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-04 23:22:14.013286+00	
00000000-0000-0000-0000-000000000000	6501b390-af27-48b6-86ef-a749961d52bd	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-04 23:29:28.546586+00	
00000000-0000-0000-0000-000000000000	6d6f6c00-c4d6-49bc-b547-902e098812d4	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-04 23:29:28.548997+00	
00000000-0000-0000-0000-000000000000	d5a81883-1de1-4552-b93d-771ae2ac642c	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-05 00:04:46.016084+00	
00000000-0000-0000-0000-000000000000	d59bbf53-1856-4d6c-ac48-2884c5e159ec	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-05 00:04:46.019266+00	
00000000-0000-0000-0000-000000000000	27b950ae-66ef-445c-904c-6405ab1957ea	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 06:04:40.691424+00	
00000000-0000-0000-0000-000000000000	b418442e-181c-405d-a8e9-d28ddb454dc9	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 06:04:40.710096+00	
00000000-0000-0000-0000-000000000000	4591ed2d-6f59-4a03-a7d1-ae999b62dfd9	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 06:04:46.998153+00	
00000000-0000-0000-0000-000000000000	1ffaac1c-da42-44ab-a451-a6b283b6532b	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 06:11:17.100531+00	
00000000-0000-0000-0000-000000000000	27eec326-a6e4-4fd5-94d1-02d866614def	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 06:18:07.780797+00	
00000000-0000-0000-0000-000000000000	e92ef345-bb7d-43f3-b23b-90157a29f5f6	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 07:53:26.856028+00	
00000000-0000-0000-0000-000000000000	cd487661-fb09-4e36-adc0-cfe5a91e18d6	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 07:53:26.868723+00	
00000000-0000-0000-0000-000000000000	85b09b5c-af87-4b21-a766-29492bcf1f96	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 19:38:49.185528+00	
00000000-0000-0000-0000-000000000000	406c2d4d-cdd7-48f9-a9be-bfa93ab572fd	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 19:38:49.199816+00	
00000000-0000-0000-0000-000000000000	065f051f-e7af-4b3f-b11a-8b0046b1bd8b	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 19:48:17.527526+00	
00000000-0000-0000-0000-000000000000	db223e03-9f00-4294-948d-ff5ad97355d3	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 19:48:17.528466+00	
00000000-0000-0000-0000-000000000000	03f651c2-4a78-458b-a6d6-8386c3f6e337	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 20:04:43.686486+00	
00000000-0000-0000-0000-000000000000	23779cf3-5c4d-49f0-9497-4a66806e94e0	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 20:04:43.688753+00	
00000000-0000-0000-0000-000000000000	700a0b7c-2fe8-40f5-b173-7195ecceab8f	{"action":"token_refreshed","actor_id":"17be3a68-8d97-4557-85e8-8e8cc9ecbc13","actor_username":"davidminirey04@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 20:07:58.078896+00	
00000000-0000-0000-0000-000000000000	56355b4e-254b-45c9-a5ff-9cea564f6eb2	{"action":"token_revoked","actor_id":"17be3a68-8d97-4557-85e8-8e8cc9ecbc13","actor_username":"davidminirey04@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 20:07:58.079801+00	
00000000-0000-0000-0000-000000000000	6b6d44ff-b3a8-4bec-b481-635e792772b9	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 20:46:47.171591+00	
00000000-0000-0000-0000-000000000000	e60f087e-fe3f-48ab-82ed-bac1ed886150	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 20:46:47.173453+00	
00000000-0000-0000-0000-000000000000	6bd4e808-cbff-45b8-9651-54b9730f335f	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 20:48:03.5577+00	
00000000-0000-0000-0000-000000000000	f07fc8ac-bd63-4236-a8fc-026ed3db92c4	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 20:48:03.558766+00	
00000000-0000-0000-0000-000000000000	4118bd38-8589-4e33-94cd-11572aa9c4a9	{"action":"user_signedup","actor_id":"2f65cd31-0b3f-462d-8e73-f612d086304b","actor_username":"axd@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-07 20:48:50.861514+00	
00000000-0000-0000-0000-000000000000	5ed655a4-52c1-4074-a61d-b801bf92f3b8	{"action":"login","actor_id":"2f65cd31-0b3f-462d-8e73-f612d086304b","actor_username":"axd@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 20:48:50.873741+00	
00000000-0000-0000-0000-000000000000	dfd195e1-c217-45dd-b17c-f7b2516e99de	{"action":"user_repeated_signup","actor_id":"2f65cd31-0b3f-462d-8e73-f612d086304b","actor_username":"axd@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-07 20:53:35.038628+00	
00000000-0000-0000-0000-000000000000	df2f16e5-7f78-45ba-a90e-69494ec6b386	{"action":"user_signedup","actor_id":"a57aab4d-0c82-479b-91cd-2502a0c7dac8","actor_username":"axd1@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-07 20:53:47.197763+00	
00000000-0000-0000-0000-000000000000	9459a388-9b4d-4d18-b3c6-81908d12c473	{"action":"login","actor_id":"a57aab4d-0c82-479b-91cd-2502a0c7dac8","actor_username":"axd1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 20:53:47.202362+00	
00000000-0000-0000-0000-000000000000	360c586b-3f76-4092-b7af-2a1e0889ebcd	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:02:51.06658+00	
00000000-0000-0000-0000-000000000000	ab3a75a1-0f1c-4fba-a185-99ad73a7f7eb	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:02:51.068161+00	
00000000-0000-0000-0000-000000000000	da18b026-bf1b-4c45-9b03-ab4418496a99	{"action":"token_refreshed","actor_id":"17be3a68-8d97-4557-85e8-8e8cc9ecbc13","actor_username":"davidminirey04@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:09:08.948014+00	
00000000-0000-0000-0000-000000000000	14d04e78-f894-4571-bca6-4f8f8816e3a8	{"action":"token_revoked","actor_id":"17be3a68-8d97-4557-85e8-8e8cc9ecbc13","actor_username":"davidminirey04@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:09:08.951945+00	
00000000-0000-0000-0000-000000000000	93d514e2-5d46-4180-8781-840f60fbdf10	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"axd@gmail.com","user_id":"2f65cd31-0b3f-462d-8e73-f612d086304b","user_phone":""}}	2025-04-07 21:09:09.834869+00	
00000000-0000-0000-0000-000000000000	2cc553d9-d876-40e6-996b-b0a5dc1bbebc	{"action":"user_signedup","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-07 21:40:35.121009+00	
00000000-0000-0000-0000-000000000000	1a06f57a-1b34-4117-8ce9-e5cb44c394cc	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 21:40:35.128482+00	
00000000-0000-0000-0000-000000000000	7d55eceb-f30d-4a7a-85d9-ccb3d4e9078a	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 21:41:29.272946+00	
00000000-0000-0000-0000-000000000000	5f3b1d94-1fb3-4837-9223-c7b4c4cc77cf	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:45:30.434673+00	
00000000-0000-0000-0000-000000000000	54e0b270-6913-4bc9-b8ff-8a8ec2e597b7	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:45:30.436991+00	
00000000-0000-0000-0000-000000000000	7d5ce59c-e2b3-4792-bb21-b9035c804551	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 21:46:59.959389+00	
00000000-0000-0000-0000-000000000000	5c3eb2dd-d612-4f07-b851-a2e210f4f862	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:49:40.050128+00	
00000000-0000-0000-0000-000000000000	3ced0dbc-b8f7-4f0e-8fa1-e8a8ba0f33a3	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:49:40.053044+00	
00000000-0000-0000-0000-000000000000	fcdc1418-3b38-439b-8fe0-b33ecac7b394	{"action":"login","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 21:49:41.436252+00	
00000000-0000-0000-0000-000000000000	90ac2117-ec74-4546-8097-fe370a4a1e3a	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 22:00:08.376267+00	
00000000-0000-0000-0000-000000000000	5b782d32-48b7-432a-82fd-23b3e3cdc2f3	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:16:29.638532+00	
00000000-0000-0000-0000-000000000000	f696e6d0-0d63-4374-8b86-4e01c847eaa9	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:16:29.641325+00	
00000000-0000-0000-0000-000000000000	b86ed736-e44e-45a2-98fb-a954b5cdaf1d	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:17:00.025943+00	
00000000-0000-0000-0000-000000000000	94407baa-583a-4a44-8ffe-8902919491e2	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:17:00.027376+00	
00000000-0000-0000-0000-000000000000	83493224-36cd-41ac-801a-7392b9785e0d	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:20:37.311406+00	
00000000-0000-0000-0000-000000000000	b990bc35-d0b2-4932-b036-39bf85c6635f	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:20:37.313008+00	
00000000-0000-0000-0000-000000000000	a79b6183-7233-46a3-8bd2-1ffad974bc01	{"action":"user_signedup","actor_id":"6eb32f88-231e-4237-9f93-6689a94b624d","actor_username":"amn@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-07 23:22:47.100552+00	
00000000-0000-0000-0000-000000000000	6283e28a-cd9a-4d10-ab02-85805a7465e8	{"action":"login","actor_id":"6eb32f88-231e-4237-9f93-6689a94b624d","actor_username":"amn@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 23:22:47.10802+00	
00000000-0000-0000-0000-000000000000	cbcb17a8-3660-4974-a602-ccd2cca5c0b3	{"action":"user_signedup","actor_id":"2eadd525-41bd-4c5d-9073-faf9c6b91714","actor_username":"auch@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-07 23:24:17.052485+00	
00000000-0000-0000-0000-000000000000	c5fcaabb-828f-494a-bc6f-376672a32bd6	{"action":"login","actor_id":"2eadd525-41bd-4c5d-9073-faf9c6b91714","actor_username":"auch@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 23:24:17.056876+00	
00000000-0000-0000-0000-000000000000	fef34e31-6845-4264-99a8-34011ca9c9f5	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:27:03.237419+00	
00000000-0000-0000-0000-000000000000	e5bdc77a-e6fe-4bc0-bb8f-0b62e7a17284	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:27:03.240034+00	
00000000-0000-0000-0000-000000000000	67b0e7a0-db43-4145-ba9a-858f86900d0f	{"action":"user_signedup","actor_id":"31fbe58a-c798-401a-b2aa-c06726293956","actor_username":"test@t.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-07 23:30:10.21646+00	
00000000-0000-0000-0000-000000000000	428f0b1a-5e1e-4122-afc8-92a1cd2e29f8	{"action":"login","actor_id":"31fbe58a-c798-401a-b2aa-c06726293956","actor_username":"test@t.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 23:30:10.221411+00	
00000000-0000-0000-0000-000000000000	8a352e21-cac4-466d-807b-ea861fafdb98	{"action":"user_signedup","actor_id":"0e41703f-9367-446f-ab66-0c5477edda65","actor_username":"abssh@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-07 23:34:08.077902+00	
00000000-0000-0000-0000-000000000000	95401c23-8855-4fd2-8ef5-b730ed563990	{"action":"login","actor_id":"0e41703f-9367-446f-ab66-0c5477edda65","actor_username":"abssh@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 23:34:08.081908+00	
00000000-0000-0000-0000-000000000000	a454e72b-cc11-46d3-aa9e-4c038185d81f	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 23:35:55.720907+00	
00000000-0000-0000-0000-000000000000	1777d670-c8c6-42f0-a35f-78593ef3bc00	{"action":"user_signedup","actor_id":"a004e928-2b22-4749-ad53-9232297705be","actor_username":"axsax@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-07 23:37:10.564274+00	
00000000-0000-0000-0000-000000000000	6952ba7d-bef8-4dd9-b457-3dcff4c671bc	{"action":"login","actor_id":"a004e928-2b22-4749-ad53-9232297705be","actor_username":"axsax@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-07 23:37:10.56962+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
00000000-0000-0000-0000-000000000000	b47428a9-2529-4a4a-b02f-5c42648e88a9	authenticated	authenticated	a@gmail.com	$2a$10$grpmfm6iw170KWu5NO9epeZPm6vGkDPI.jo97dpAKV.y3unPRPPGm	2025-04-03 19:47:21.357693+00	\N		\N		\N			\N	2025-04-03 19:47:21.368546+00	{"provider": "email", "providers": ["email"]}	{"sub": "b47428a9-2529-4a4a-b02f-5c42648e88a9", "name": "Isaac", "role": "employee", "email": "a@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-03 19:47:21.340262+00	2025-04-03 22:55:03.194041+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	31f3a821-66c2-42eb-8def-2880197e8a7d	authenticated	authenticated	rikytellez04@hotmail.com	$2a$10$PfyRRdZAomv5nXcO3Kb5XekBSLazNuE1/Y3eY19jw3nZjiRfl2RIO	2025-04-03 06:26:33.262243+00	\N		\N		\N			\N	2025-04-03 06:26:33.26604+00	{"provider": "email", "providers": ["email"]}	{"sub": "31f3a821-66c2-42eb-8def-2880197e8a7d", "name": "rick", "role": "employee", "email": "rikytellez04@hotmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-03 06:26:33.250628+00	2025-04-03 06:26:33.268963+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ecdca837-6a64-41a9-9642-196ffac92612	authenticated	authenticated	rikytellez04@gmail.com	$2a$10$giHCc0G87xdwiiozFMh17Oz4FojH/iIhSyQI3zRPCFlY3s1VYCueK	2025-04-03 06:22:53.615476+00	\N		\N		\N			\N	2025-04-03 23:36:09.870518+00	{"provider": "email", "providers": ["email"]}	{"sub": "ecdca837-6a64-41a9-9642-196ffac92612", "name": "rick", "role": "employee", "email": "rikytellez04@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-03 06:22:53.59935+00	2025-04-03 23:36:09.87217+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c0534a2b-cecc-444e-99a4-acb9f7eca6de	authenticated	authenticated	jorgebcarriles@outlook.com	$2a$10$vo0hXS8dfxAK.49eHZ1XrOUV57B/iZQqkFPX1Jx8aFxgUQJljLP0i	2025-04-03 22:04:30.436037+00	\N		\N	feaad38dc3575313bb8aa4b9c8cf49d8c75eddb8e2ae6b5d41f74d12	2025-04-04 00:04:23.460612+00			\N	\N	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-04-03 22:04:30.416824+00	2025-04-04 00:04:23.730329+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	5314bfcf-8401-457f-b7a7-2221ea64777c	authenticated	authenticated	a01198327@tec.mx	$2a$10$PGTXzuYGOmd69KgBNolwFOnrdXRyd16KK0w.a4tByaYt4/Xx.X0Ju	2025-04-04 00:22:35.993504+00	\N		\N		\N			\N	2025-04-04 00:22:35.998489+00	{"provider": "email", "providers": ["email"]}	{"sub": "5314bfcf-8401-457f-b7a7-2221ea64777c", "name": "Betanzo", "role": "employee", "email": "a01198327@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-04 00:22:35.978162+00	2025-04-04 19:39:10.021537+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ff98b050-236d-4a28-8aea-567f03b9f3c3	authenticated	authenticated	rantonion2004@outlook.com	$2a$10$z/JTayFCOsYP7u9ubuQL9u6BdJ0xo3xZ6ndfh0/PsoLfeKx7kGUQC	2025-04-04 22:56:53.287928+00	\N		\N		\N			\N	2025-04-07 21:46:59.963427+00	{"provider": "email", "providers": ["email"]}	{"sub": "ff98b050-236d-4a28-8aea-567f03b9f3c3", "name": "Ramón Antonio Naranjo Sarmiento", "role": "employee", "email": "rantonion2004@outlook.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 22:56:53.278128+00	2025-04-07 23:27:03.24583+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7478c90f-4de7-494d-ae79-fc28756dc4ab	authenticated	authenticated	a01741300@tec.mx	$2a$10$owQpDbpAjPcrHR7s7B0MWOlIDVtRxarymDgdjSh7gohAN3B6cm8GO	2025-04-03 07:26:01.05692+00	\N		\N		\N			\N	2025-04-07 22:00:08.37728+00	{"provider": "email", "providers": ["email"]}	{"sub": "7478c90f-4de7-494d-ae79-fc28756dc4ab", "name": "rick", "role": "employee", "email": "a01741300@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-03 07:26:01.049841+00	2025-04-07 23:16:29.648295+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	authenticated	authenticated	davidminirey04@gmail.com	$2a$10$TeZT5rMlteYWsjreun8va.hwqfF9kEzqnIMUXPDmQLhMnDfzbnfbO	2025-04-04 21:09:21.551978+00	\N		\N		\N			\N	2025-04-04 21:09:21.55618+00	{"provider": "email", "providers": ["email"]}	{"sub": "17be3a68-8d97-4557-85e8-8e8cc9ecbc13", "name": "david", "role": "employee", "email": "davidminirey04@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 21:09:21.542561+00	2025-04-07 21:09:08.957296+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	dee4835c-764c-40fb-bf0b-3bff8a0457d4	authenticated	authenticated	naranjilandia2004@gmail.com	$2a$10$Tik8uk7nAlAadCnW1g/hzeYq8EvKZyGt1vFjR7lN.kMbfrVMDogam	2025-04-04 22:40:28.570105+00	\N		\N		\N			\N	2025-04-04 22:42:21.387227+00	{"provider": "email", "providers": ["email"]}	{"sub": "dee4835c-764c-40fb-bf0b-3bff8a0457d4", "name": "Pancho Naranjas", "role": "employee", "email": "naranjilandia2004@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 22:40:28.547229+00	2025-04-04 22:42:21.389543+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c3886a9b-c360-4fec-b16d-058747789ee2	authenticated	authenticated	xnhs@gmail.com	$2a$10$/QtdK4HWS1q5ro4jAQfl1.yHOM/Pa9N6qisvygjDmibfsWZ8bJ2fW	2025-04-04 23:16:23.82409+00	\N		\N		\N			\N	2025-04-04 23:16:23.828387+00	{"provider": "email", "providers": ["email"]}	{"sub": "c3886a9b-c360-4fec-b16d-058747789ee2", "name": "aksc", "role": "employee", "email": "xnhs@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 23:16:23.810339+00	2025-04-04 23:16:23.83311+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9d6ddaee-5f7c-4cef-8705-6db6a8d11109	authenticated	authenticated	yi@gmail.com	$2a$10$YejIlid.nPj3l92KfHe3yOC6SPGbgX1uj3HJ4TsPFexbIIwLiCy/a	2025-04-04 23:08:43.133554+00	\N		\N		\N			\N	2025-04-04 23:08:43.138398+00	{"provider": "email", "providers": ["email"]}	{"sub": "9d6ddaee-5f7c-4cef-8705-6db6a8d11109", "name": "yi", "role": "employee", "email": "yi@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 23:08:43.123322+00	2025-04-04 23:08:43.144236+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	564b41de-e4a1-4e56-bff7-c0681abc0718	authenticated	authenticated	a01198676@tec.mx	$2a$10$OWdlCJDTVT2YUv65UgEuIubEYL9cPUJ.vq.1hmBC8poIp/M3Jh4wq	2025-04-04 00:05:14.081829+00	\N		\N		\N			\N	2025-04-04 08:37:41.63076+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-04-04 00:05:14.078028+00	2025-04-07 23:17:00.031027+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9950b2e9-632f-42ff-b259-726ede4e408f	authenticated	authenticated	emirpuente31@gmail.com	$2a$10$0ZK6OsdkRn0vP77iccMbLu9LJXM8hD/nrIv6szdiU2tY9uyaUTvp6	2025-04-04 21:08:41.014941+00	\N		\N		\N			\N	2025-04-07 21:49:41.437657+00	{"provider": "email", "providers": ["email"]}	{"sub": "9950b2e9-632f-42ff-b259-726ede4e408f", "name": "Emir ", "role": "employee", "email": "emirpuente31@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 21:08:40.986911+00	2025-04-07 21:49:41.440292+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7dfad126-2905-431a-829b-fcae851fe102	authenticated	authenticated	a01722728@tec.mx	$2a$10$fHgy1ulquoZVKjgjGIMgEuPLZytPHDv0KCKtQ0FPmYxwVgtSvPvlm	2025-04-07 21:40:35.123375+00	\N		\N		\N			\N	2025-04-07 23:35:55.722775+00	{"provider": "email", "providers": ["email"]}	{"sub": "7dfad126-2905-431a-829b-fcae851fe102", "name": "David", "role": "employee", "email": "a01722728@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-07 21:40:35.104179+00	2025-04-07 23:35:55.729102+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	31fbe58a-c798-401a-b2aa-c06726293956	authenticated	authenticated	test@t.com	$2a$10$K9kHR.xxhkhjaWhQZ/jZ2eLyluSQN/sA3Bs.yimUgo3ehfCtEMbju	2025-04-07 23:30:10.217825+00	\N		\N		\N			\N	2025-04-07 23:30:10.221985+00	{"provider": "email", "providers": ["email"]}	{"sub": "31fbe58a-c798-401a-b2aa-c06726293956", "name": "test", "role": "employee", "email": "test@t.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:30:10.209378+00	2025-04-07 23:30:10.226874+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	a57aab4d-0c82-479b-91cd-2502a0c7dac8	authenticated	authenticated	axd1@gmail.com	$2a$10$0m96m3gIrJdjR5oWHWKAdOfF86LHrBWkQO7eLl9JVd3PJjbEYtsTy	2025-04-07 20:53:47.198258+00	\N		\N		\N			\N	2025-04-07 20:53:47.202909+00	{"provider": "email", "providers": ["email"]}	{"sub": "a57aab4d-0c82-479b-91cd-2502a0c7dac8", "name": "Sergio  r", "role": "employee", "email": "axd1@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 20:53:47.189776+00	2025-04-07 20:53:47.205373+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	6eb32f88-231e-4237-9f93-6689a94b624d	authenticated	authenticated	amn@gmail.com	$2a$10$Ckh27Orq6sogU.2AQM3o7.IJZru68Y/P/AH/icKDxEs7PT4WKty/6	2025-04-07 23:22:47.101193+00	\N		\N		\N			\N	2025-04-07 23:22:47.108577+00	{"provider": "email", "providers": ["email"]}	{"sub": "6eb32f88-231e-4237-9f93-6689a94b624d", "name": "sd", "role": "employee", "email": "amn@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:22:47.085246+00	2025-04-07 23:22:47.112571+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	a004e928-2b22-4749-ad53-9232297705be	authenticated	authenticated	axsax@gmail.com	$2a$10$ppQPCy/f.BK6QtUHzgPCZ.yLLgZ.ayp68L6BICCX5bRELEJWkGfg2	2025-04-07 23:37:10.565014+00	\N		\N		\N			\N	2025-04-07 23:37:10.570188+00	{"provider": "email", "providers": ["email"]}	{"sub": "a004e928-2b22-4749-ad53-9232297705be", "name": "kns", "role": "employee", "email": "axsax@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:37:10.557368+00	2025-04-07 23:37:10.575596+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	2eadd525-41bd-4c5d-9073-faf9c6b91714	authenticated	authenticated	auch@gmail.com	$2a$10$hZU71NZ3Czh/GpcDBlfGk.SUpJBamfsFjU1i05QQcQxaLMBDe7CFe	2025-04-07 23:24:17.053171+00	\N		\N		\N			\N	2025-04-07 23:24:17.057432+00	{"provider": "email", "providers": ["email"]}	{"sub": "2eadd525-41bd-4c5d-9073-faf9c6b91714", "name": "Auch", "role": "employee", "email": "auch@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:24:17.045429+00	2025-04-07 23:24:17.059855+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0e41703f-9367-446f-ab66-0c5477edda65	authenticated	authenticated	abssh@g.com	$2a$10$RqixGH6i3R3vUY7Q0fEBj.TJC4/YUdLfToH.eeFmTWleNlGxUthLC	2025-04-07 23:34:08.078617+00	\N		\N		\N			\N	2025-04-07 23:34:08.082505+00	{"provider": "email", "providers": ["email"]}	{"sub": "0e41703f-9367-446f-ab66-0c5477edda65", "name": "ajsn", "role": "employee", "email": "abssh@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:34:08.071059+00	2025-04-07 23:34:08.085205+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
ecdca837-6a64-41a9-9642-196ffac92612	ecdca837-6a64-41a9-9642-196ffac92612	{"sub": "ecdca837-6a64-41a9-9642-196ffac92612", "name": "rick", "role": "employee", "email": "rikytellez04@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-03 06:22:53.611605+00	2025-04-03 06:22:53.611654+00	2025-04-03 06:22:53.611654+00	30bd86a7-5fcd-4705-8182-3ba69fccb16b
31f3a821-66c2-42eb-8def-2880197e8a7d	31f3a821-66c2-42eb-8def-2880197e8a7d	{"sub": "31f3a821-66c2-42eb-8def-2880197e8a7d", "name": "rick", "role": "employee", "email": "rikytellez04@hotmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-03 06:26:33.256973+00	2025-04-03 06:26:33.25703+00	2025-04-03 06:26:33.25703+00	78bf22fc-bc5a-41ae-817e-3a07172a5a6f
7478c90f-4de7-494d-ae79-fc28756dc4ab	7478c90f-4de7-494d-ae79-fc28756dc4ab	{"sub": "7478c90f-4de7-494d-ae79-fc28756dc4ab", "name": "rick", "role": "employee", "email": "a01741300@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-03 07:26:01.053015+00	2025-04-03 07:26:01.053066+00	2025-04-03 07:26:01.053066+00	d78459bb-c907-40f1-8fd4-cf04b95da0a4
b47428a9-2529-4a4a-b02f-5c42648e88a9	b47428a9-2529-4a4a-b02f-5c42648e88a9	{"sub": "b47428a9-2529-4a4a-b02f-5c42648e88a9", "name": "Isaac", "role": "employee", "email": "a@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-03 19:47:21.352959+00	2025-04-03 19:47:21.353021+00	2025-04-03 19:47:21.353021+00	cbc756cf-2eba-4790-beb2-3bffe1ce4fc6
c0534a2b-cecc-444e-99a4-acb9f7eca6de	c0534a2b-cecc-444e-99a4-acb9f7eca6de	{"sub": "c0534a2b-cecc-444e-99a4-acb9f7eca6de", "email": "jorgebcarriles@outlook.com", "email_verified": false, "phone_verified": false}	email	2025-04-03 22:04:30.430987+00	2025-04-03 22:04:30.431064+00	2025-04-03 22:04:30.431064+00	d834ddc7-fbbe-4292-8d67-97dd8dfd7fb4
564b41de-e4a1-4e56-bff7-c0681abc0718	564b41de-e4a1-4e56-bff7-c0681abc0718	{"sub": "564b41de-e4a1-4e56-bff7-c0681abc0718", "email": "a01198676@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-04 00:05:14.07934+00	2025-04-04 00:05:14.079392+00	2025-04-04 00:05:14.079392+00	b71db637-488d-42af-a782-4c1f1f2bb394
5314bfcf-8401-457f-b7a7-2221ea64777c	5314bfcf-8401-457f-b7a7-2221ea64777c	{"sub": "5314bfcf-8401-457f-b7a7-2221ea64777c", "name": "Betanzo", "role": "employee", "email": "a01198327@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-04 00:22:35.983299+00	2025-04-04 00:22:35.983348+00	2025-04-04 00:22:35.983348+00	fdc36e6d-ebbd-4ea0-8ad7-5f54cddabc32
9950b2e9-632f-42ff-b259-726ede4e408f	9950b2e9-632f-42ff-b259-726ede4e408f	{"sub": "9950b2e9-632f-42ff-b259-726ede4e408f", "name": "Emir ", "role": "employee", "email": "emirpuente31@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-04 21:08:41.008459+00	2025-04-04 21:08:41.008523+00	2025-04-04 21:08:41.008523+00	72183672-4424-4dc2-b4a9-2e0083e3431e
17be3a68-8d97-4557-85e8-8e8cc9ecbc13	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	{"sub": "17be3a68-8d97-4557-85e8-8e8cc9ecbc13", "name": "david", "role": "employee", "email": "davidminirey04@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-04 21:09:21.545047+00	2025-04-04 21:09:21.545094+00	2025-04-04 21:09:21.545094+00	903dcc5b-c5c2-4bc5-95bc-0087602e03b3
dee4835c-764c-40fb-bf0b-3bff8a0457d4	dee4835c-764c-40fb-bf0b-3bff8a0457d4	{"sub": "dee4835c-764c-40fb-bf0b-3bff8a0457d4", "name": "Pancho Naranjas", "role": "employee", "email": "naranjilandia2004@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-04 22:40:28.561362+00	2025-04-04 22:40:28.561412+00	2025-04-04 22:40:28.561412+00	f6030f82-d5da-4bbd-8d32-95f9ff3d944e
ff98b050-236d-4a28-8aea-567f03b9f3c3	ff98b050-236d-4a28-8aea-567f03b9f3c3	{"sub": "ff98b050-236d-4a28-8aea-567f03b9f3c3", "name": "Ramón Antonio Naranjo Sarmiento", "role": "employee", "email": "rantonion2004@outlook.com", "email_verified": false, "phone_verified": false}	email	2025-04-04 22:56:53.282622+00	2025-04-04 22:56:53.282668+00	2025-04-04 22:56:53.282668+00	f465828d-04e4-4e7b-8cf2-2807df063a30
9d6ddaee-5f7c-4cef-8705-6db6a8d11109	9d6ddaee-5f7c-4cef-8705-6db6a8d11109	{"sub": "9d6ddaee-5f7c-4cef-8705-6db6a8d11109", "name": "yi", "role": "employee", "email": "yi@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-04 23:08:43.128026+00	2025-04-04 23:08:43.128077+00	2025-04-04 23:08:43.128077+00	2bca314c-4fa4-4b06-a242-89b0bc597f0e
c3886a9b-c360-4fec-b16d-058747789ee2	c3886a9b-c360-4fec-b16d-058747789ee2	{"sub": "c3886a9b-c360-4fec-b16d-058747789ee2", "name": "aksc", "role": "employee", "email": "xnhs@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-04 23:16:23.818036+00	2025-04-04 23:16:23.818087+00	2025-04-04 23:16:23.818087+00	31bcaf0b-f4de-46ae-94a8-cc2bf7b14b03
a57aab4d-0c82-479b-91cd-2502a0c7dac8	a57aab4d-0c82-479b-91cd-2502a0c7dac8	{"sub": "a57aab4d-0c82-479b-91cd-2502a0c7dac8", "name": "Sergio  r", "role": "employee", "email": "axd1@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-07 20:53:47.195174+00	2025-04-07 20:53:47.195223+00	2025-04-07 20:53:47.195223+00	71b3b196-4a75-4375-b0b0-10175f9cc1a3
7dfad126-2905-431a-829b-fcae851fe102	7dfad126-2905-431a-829b-fcae851fe102	{"sub": "7dfad126-2905-431a-829b-fcae851fe102", "name": "David", "role": "employee", "email": "a01722728@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-07 21:40:35.112995+00	2025-04-07 21:40:35.113043+00	2025-04-07 21:40:35.113043+00	92459713-b1cf-491d-84cc-971bd79744fa
6eb32f88-231e-4237-9f93-6689a94b624d	6eb32f88-231e-4237-9f93-6689a94b624d	{"sub": "6eb32f88-231e-4237-9f93-6689a94b624d", "name": "sd", "role": "employee", "email": "amn@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-07 23:22:47.095753+00	2025-04-07 23:22:47.095803+00	2025-04-07 23:22:47.095803+00	2860a4a1-e0b4-41db-bf5d-8fcdc1de9b51
2eadd525-41bd-4c5d-9073-faf9c6b91714	2eadd525-41bd-4c5d-9073-faf9c6b91714	{"sub": "2eadd525-41bd-4c5d-9073-faf9c6b91714", "name": "Auch", "role": "employee", "email": "auch@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-07 23:24:17.048874+00	2025-04-07 23:24:17.048924+00	2025-04-07 23:24:17.048924+00	c5a89176-a674-47ef-9373-ca70fb94bff8
31fbe58a-c798-401a-b2aa-c06726293956	31fbe58a-c798-401a-b2aa-c06726293956	{"sub": "31fbe58a-c798-401a-b2aa-c06726293956", "name": "test", "role": "employee", "email": "test@t.com", "email_verified": false, "phone_verified": false}	email	2025-04-07 23:30:10.213287+00	2025-04-07 23:30:10.213339+00	2025-04-07 23:30:10.213339+00	1ab6050f-9eef-4b84-8ca4-231c71aa26f8
0e41703f-9367-446f-ab66-0c5477edda65	0e41703f-9367-446f-ab66-0c5477edda65	{"sub": "0e41703f-9367-446f-ab66-0c5477edda65", "name": "ajsn", "role": "employee", "email": "abssh@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-07 23:34:08.075044+00	2025-04-07 23:34:08.075096+00	2025-04-07 23:34:08.075096+00	31aa77fd-eb9e-4b44-9fd1-e8cecc4617f3
a004e928-2b22-4749-ad53-9232297705be	a004e928-2b22-4749-ad53-9232297705be	{"sub": "a004e928-2b22-4749-ad53-9232297705be", "name": "kns", "role": "employee", "email": "axsax@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-07 23:37:10.560874+00	2025-04-07 23:37:10.560921+00	2025-04-07 23:37:10.560921+00	4b6f0695-6aca-4c80-867a-48a78d257c39
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") FROM stdin;
733241d6-054d-4e3e-bf06-310dca382bc5	31f3a821-66c2-42eb-8def-2880197e8a7d	2025-04-03 06:26:33.266108+00	2025-04-03 06:26:33.266108+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	189.203.91.63	\N
13e2f0a4-5a4f-4f0e-b465-91837ab82d2c	a57aab4d-0c82-479b-91cd-2502a0c7dac8	2025-04-07 20:53:47.20299+00	2025-04-07 20:53:47.20299+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.220	\N
953b73f9-8476-48d3-ace2-5b10992121ea	5314bfcf-8401-457f-b7a7-2221ea64777c	2025-04-04 00:22:35.998592+00	2025-04-04 19:39:10.028773+00	\N	aal1	\N	2025-04-04 19:39:10.028684	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
bec1f936-4b9c-497a-9455-f341b87dbb56	b47428a9-2529-4a4a-b02f-5c42648e88a9	2025-04-03 19:47:21.368628+00	2025-04-03 22:55:03.195922+00	\N	aal1	\N	2025-04-03 22:55:03.195843	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
eae19aa7-4c5a-45bc-a49d-4cf41d135afb	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-03 23:31:41.96485+00	2025-04-03 23:31:41.96485+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
81b83de8-6521-4406-9d88-1baf1042a934	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-03 23:34:07.036008+00	2025-04-03 23:34:07.036008+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
e653fdea-2a0c-43ed-a035-03f67dea0255	ecdca837-6a64-41a9-9642-196ffac92612	2025-04-03 23:35:30.817062+00	2025-04-03 23:35:30.817062+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
347e93a6-93fb-4ec7-aea7-622a5f6e7593	ecdca837-6a64-41a9-9642-196ffac92612	2025-04-03 23:36:09.87059+00	2025-04-03 23:36:09.87059+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
7a31d097-c55a-4018-b588-4fe9d1c7504f	564b41de-e4a1-4e56-bff7-c0681abc0718	2025-04-04 00:29:14.802993+00	2025-04-04 00:29:14.802993+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0	131.178.102.136	\N
1e42d3df-93ea-4244-861a-66dc0fa77519	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-04 19:40:52.561563+00	2025-04-04 21:00:30.571726+00	\N	aal1	\N	2025-04-04 21:00:30.571655	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
f45c7343-bb68-4116-9c42-51817358d703	564b41de-e4a1-4e56-bff7-c0681abc0718	2025-04-04 00:30:29.010274+00	2025-04-04 08:03:10.184889+00	\N	aal1	\N	2025-04-04 08:03:10.184266	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	189.159.103.134	\N
0e58ad5a-2204-4502-9aee-d1d433ca2f8b	564b41de-e4a1-4e56-bff7-c0681abc0718	2025-04-04 08:03:29.666066+00	2025-04-04 08:03:29.666066+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	189.159.103.134	\N
357ed060-0e3f-4905-b8b1-62f07e7bfb2e	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-04 21:09:45.904436+00	2025-04-04 21:09:45.904436+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	131.178.102.156	\N
2de106ed-45b8-48bc-99f9-7a8b7dbbe143	dee4835c-764c-40fb-bf0b-3bff8a0457d4	2025-04-04 22:41:50.102939+00	2025-04-04 22:41:50.102939+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0	131.178.102.220	\N
cb0ef6db-3928-456b-bb08-02a7817dc531	dee4835c-764c-40fb-bf0b-3bff8a0457d4	2025-04-04 22:42:21.387303+00	2025-04-04 22:42:21.387303+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0	131.178.102.220	\N
a84d8879-7ad4-40b4-93e1-2a4d44f64e1c	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-04 22:57:17.535893+00	2025-04-04 22:57:17.535893+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0	131.178.102.220	\N
48596cd3-600f-4b74-9120-649bd3f269d5	9d6ddaee-5f7c-4cef-8705-6db6a8d11109	2025-04-04 23:08:43.13847+00	2025-04-04 23:08:43.13847+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
869e3abf-7e8a-47f2-a832-6ca24973903e	c3886a9b-c360-4fec-b16d-058747789ee2	2025-04-04 23:16:23.828462+00	2025-04-04 23:16:23.828462+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
c6efa894-a00f-4d8f-8e9f-d5d13662571a	564b41de-e4a1-4e56-bff7-c0681abc0718	2025-04-04 08:37:41.630831+00	2025-04-07 23:17:00.033077+00	\N	aal1	\N	2025-04-07 23:17:00.032988	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.164	\N
85c6b0e3-9366-4ce2-b77b-25026aa62922	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-04 22:57:33.037189+00	2025-04-07 06:04:40.735412+00	\N	aal1	\N	2025-04-07 06:04:40.734585	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	187.190.181.239	\N
88c69472-f73c-4cd4-a282-29729ccfacfb	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-07 06:04:47.003094+00	2025-04-07 06:04:47.003094+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	187.190.181.239	\N
3b4835ff-150d-411c-9163-e901122cd92c	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-07 06:11:17.102941+00	2025-04-07 06:11:17.102941+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	187.190.181.239	\N
e356093c-d48d-4593-ad76-c0f8f198215e	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-07 06:18:07.783482+00	2025-04-07 21:02:51.072978+00	\N	aal1	\N	2025-04-07 21:02:51.072904	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	131.178.102.212	\N
d7992f80-8d49-452e-b502-35b830be963a	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	2025-04-04 21:09:21.556257+00	2025-04-07 21:09:08.959286+00	\N	aal1	\N	2025-04-07 21:09:08.959212	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.196	\N
48c8598d-bb2a-43f1-9d25-36462d3e8c76	7dfad126-2905-431a-829b-fcae851fe102	2025-04-07 21:40:35.129189+00	2025-04-07 21:40:35.129189+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.220	\N
4fca3c70-db1b-4df9-b886-2128414bfff2	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-04 21:10:08.113152+00	2025-04-07 21:49:40.062136+00	\N	aal1	\N	2025-04-07 21:49:40.062059	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	131.178.102.172	\N
97af4dbc-bc49-480b-a851-142d4eaaf6df	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-07 21:49:41.437749+00	2025-04-07 21:49:41.437749+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	131.178.102.172	\N
d213db54-7020-4fa5-8e48-069ed093578d	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-04 23:22:14.0165+00	2025-04-07 20:48:03.563015+00	\N	aal1	\N	2025-04-07 20:48:03.562941	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.220	\N
7076da94-128a-49a0-83ec-44cbdf37a44b	2eadd525-41bd-4c5d-9073-faf9c6b91714	2025-04-07 23:24:17.05751+00	2025-04-07 23:24:17.05751+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
6bac3d94-89e9-48a8-806e-f660cc2f3f64	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-07 22:00:08.377417+00	2025-04-07 23:16:29.650974+00	\N	aal1	\N	2025-04-07 23:16:29.650903	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
20c3aa32-bdab-4507-ba93-277b988c5e88	7dfad126-2905-431a-829b-fcae851fe102	2025-04-07 21:41:29.274689+00	2025-04-07 23:20:37.317303+00	\N	aal1	\N	2025-04-07 23:20:37.317234	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.196	\N
23d60cde-7e1f-4b09-9fc5-c1ee1aa38707	6eb32f88-231e-4237-9f93-6689a94b624d	2025-04-07 23:22:47.108651+00	2025-04-07 23:22:47.108651+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
130e0fb5-ad02-4b04-a09f-718a2beb5096	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-07 21:46:59.963512+00	2025-04-07 23:27:03.247171+00	\N	aal1	\N	2025-04-07 23:27:03.2471	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	131.178.102.212	\N
a1291826-8325-46d8-a380-7f1b5910c5e4	31fbe58a-c798-401a-b2aa-c06726293956	2025-04-07 23:30:10.222085+00	2025-04-07 23:30:10.222085+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
a82dfff5-488c-451d-9b51-8489f373de8f	0e41703f-9367-446f-ab66-0c5477edda65	2025-04-07 23:34:08.082589+00	2025-04-07 23:34:08.082589+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
bd306676-f60a-4666-a038-5c80d3c4efe7	7dfad126-2905-431a-829b-fcae851fe102	2025-04-07 23:35:55.72285+00	2025-04-07 23:35:55.72285+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.212	\N
12276b70-03e0-4dd9-b0bb-44f782a60260	a004e928-2b22-4749-ad53-9232297705be	2025-04-07 23:37:10.570256+00	2025-04-07 23:37:10.570256+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
733241d6-054d-4e3e-bf06-310dca382bc5	2025-04-03 06:26:33.269406+00	2025-04-03 06:26:33.269406+00	password	b7f0a3c8-7397-47fd-9f8e-0f6205c7f171
bec1f936-4b9c-497a-9455-f341b87dbb56	2025-04-03 19:47:21.371791+00	2025-04-03 19:47:21.371791+00	password	3fc7ebb2-831e-4d10-bf25-63b353d9e558
eae19aa7-4c5a-45bc-a49d-4cf41d135afb	2025-04-03 23:31:41.970213+00	2025-04-03 23:31:41.970213+00	otp	1a59f0c6-69cb-4c40-9b13-0c0d798b1581
81b83de8-6521-4406-9d88-1baf1042a934	2025-04-03 23:34:07.039095+00	2025-04-03 23:34:07.039095+00	password	36813dd6-699e-4712-8381-3497b82e4bd1
e653fdea-2a0c-43ed-a035-03f67dea0255	2025-04-03 23:35:30.825701+00	2025-04-03 23:35:30.825701+00	otp	8d86d58f-d0ec-47c6-866e-681e007393db
347e93a6-93fb-4ec7-aea7-622a5f6e7593	2025-04-03 23:36:09.872504+00	2025-04-03 23:36:09.872504+00	password	2dd560e1-c353-4280-91eb-2f0298a7d9a6
953b73f9-8476-48d3-ace2-5b10992121ea	2025-04-04 00:22:36.007391+00	2025-04-04 00:22:36.007391+00	password	a27c4c73-176a-4b91-9198-eb7e7cee2156
7a31d097-c55a-4018-b588-4fe9d1c7504f	2025-04-04 00:29:14.808751+00	2025-04-04 00:29:14.808751+00	otp	2f4e832b-120e-43ac-9034-ac307eac9168
f45c7343-bb68-4116-9c42-51817358d703	2025-04-04 00:30:29.016181+00	2025-04-04 00:30:29.016181+00	password	24554595-efbf-4615-b906-8f49dc62d729
0e58ad5a-2204-4502-9aee-d1d433ca2f8b	2025-04-04 08:03:29.671047+00	2025-04-04 08:03:29.671047+00	password	cb109a87-c0f6-4a37-a0dc-77c58d7642b8
c6efa894-a00f-4d8f-8e9f-d5d13662571a	2025-04-04 08:37:41.638259+00	2025-04-04 08:37:41.638259+00	password	b5dde31a-0eb3-4302-90e2-0711b34d4301
1e42d3df-93ea-4244-861a-66dc0fa77519	2025-04-04 19:40:52.569667+00	2025-04-04 19:40:52.569667+00	password	5b522ec5-e272-4b0d-bf18-e4f7d221fa0c
d7992f80-8d49-452e-b502-35b830be963a	2025-04-04 21:09:21.558885+00	2025-04-04 21:09:21.558885+00	password	ef26e289-a165-4e91-9e58-340587167dfb
357ed060-0e3f-4905-b8b1-62f07e7bfb2e	2025-04-04 21:09:45.906584+00	2025-04-04 21:09:45.906584+00	otp	fb8d924a-2c22-4659-8986-bc815ed97329
4fca3c70-db1b-4df9-b886-2128414bfff2	2025-04-04 21:10:08.115154+00	2025-04-04 21:10:08.115154+00	password	e6087eb8-8478-44ec-81a1-9f1129f8ebe2
2de106ed-45b8-48bc-99f9-7a8b7dbbe143	2025-04-04 22:41:50.107205+00	2025-04-04 22:41:50.107205+00	otp	0300a4ef-a9b7-432a-aeaa-8483b9714a20
cb0ef6db-3928-456b-bb08-02a7817dc531	2025-04-04 22:42:21.389932+00	2025-04-04 22:42:21.389932+00	password	e3f7c1a4-71c7-45e2-a541-3d79bbae22ef
a84d8879-7ad4-40b4-93e1-2a4d44f64e1c	2025-04-04 22:57:17.54153+00	2025-04-04 22:57:17.54153+00	otp	385fc376-2e21-418c-abfc-30ca007f5392
85c6b0e3-9366-4ce2-b77b-25026aa62922	2025-04-04 22:57:33.039175+00	2025-04-04 22:57:33.039175+00	password	03dfb4b8-5ad7-4714-899d-f9144ee9c638
48596cd3-600f-4b74-9120-649bd3f269d5	2025-04-04 23:08:43.144712+00	2025-04-04 23:08:43.144712+00	password	15203264-6003-48a6-b87a-7ed2322e8553
869e3abf-7e8a-47f2-a832-6ca24973903e	2025-04-04 23:16:23.834214+00	2025-04-04 23:16:23.834214+00	password	086bc4ea-14f0-42e1-b067-d96bc1942791
d213db54-7020-4fa5-8e48-069ed093578d	2025-04-04 23:22:14.027103+00	2025-04-04 23:22:14.027103+00	password	f5f0911b-fbd3-4909-a23f-38458c0f2ec0
88c69472-f73c-4cd4-a282-29729ccfacfb	2025-04-07 06:04:47.011268+00	2025-04-07 06:04:47.011268+00	password	82c96b81-9010-4779-8f5b-bb61e12cb632
3b4835ff-150d-411c-9163-e901122cd92c	2025-04-07 06:11:17.111858+00	2025-04-07 06:11:17.111858+00	password	cfa026dc-7851-4350-9429-9d0e27b896b9
e356093c-d48d-4593-ad76-c0f8f198215e	2025-04-07 06:18:07.79076+00	2025-04-07 06:18:07.79076+00	password	fd20aca4-0fcd-4ef0-8de7-091f2c91255d
13e2f0a4-5a4f-4f0e-b465-91837ab82d2c	2025-04-07 20:53:47.205781+00	2025-04-07 20:53:47.205781+00	password	d094e455-b88b-4afe-b396-7234c5c4c398
48c8598d-bb2a-43f1-9d25-36462d3e8c76	2025-04-07 21:40:35.134844+00	2025-04-07 21:40:35.134844+00	password	133d421c-c91c-4f1d-a3c7-7185a835c517
20c3aa32-bdab-4507-ba93-277b988c5e88	2025-04-07 21:41:29.281469+00	2025-04-07 21:41:29.281469+00	password	85174375-1e1e-4b01-b386-9d2473b4bd0d
130e0fb5-ad02-4b04-a09f-718a2beb5096	2025-04-07 21:46:59.967573+00	2025-04-07 21:46:59.967573+00	password	a1897dff-b5ad-43c7-a655-79d462c6acd6
97af4dbc-bc49-480b-a851-142d4eaaf6df	2025-04-07 21:49:41.440583+00	2025-04-07 21:49:41.440583+00	password	80bc0682-f49a-4db6-bcad-4feaa15f8fa0
6bac3d94-89e9-48a8-806e-f660cc2f3f64	2025-04-07 22:00:08.383532+00	2025-04-07 22:00:08.383532+00	password	06599a9f-c277-4b21-86c1-7fed74cb99ab
23d60cde-7e1f-4b09-9fc5-c1ee1aa38707	2025-04-07 23:22:47.113058+00	2025-04-07 23:22:47.113058+00	password	0834cd65-801a-4f93-869c-01de987a2258
7076da94-128a-49a0-83ec-44cbdf37a44b	2025-04-07 23:24:17.060334+00	2025-04-07 23:24:17.060334+00	password	2fb0f93a-eb0f-42e5-a683-527d2379fbe5
a1291826-8325-46d8-a380-7f1b5910c5e4	2025-04-07 23:30:10.227475+00	2025-04-07 23:30:10.227475+00	password	e3bcbd11-2a84-4abe-86e5-ab803fd1e0bb
a82dfff5-488c-451d-9b51-8489f373de8f	2025-04-07 23:34:08.085723+00	2025-04-07 23:34:08.085723+00	password	b2d80166-f26e-4be7-b416-5a7cf4ac0349
bd306676-f60a-4666-a038-5c80d3c4efe7	2025-04-07 23:35:55.729743+00	2025-04-07 23:35:55.729743+00	password	c4971bfb-6035-4853-b9aa-39288aad1a6a
12276b70-03e0-4dd9-b0bb-44f782a60260	2025-04-07 23:37:10.576039+00	2025-04-07 23:37:10.576039+00	password	42c8c6c3-d89b-4d27-a328-ee568a55edaf
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
98674b2d-834b-434a-9e93-c722d2bbc703	c0534a2b-cecc-444e-99a4-acb9f7eca6de	recovery_token	feaad38dc3575313bb8aa4b9c8cf49d8c75eddb8e2ae6b5d41f74d12	jorgebcarriles@outlook.com	2025-04-04 00:04:23.734565	2025-04-04 00:04:23.734565
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
00000000-0000-0000-0000-000000000000	4	UBmlZVdbiqUVBZ1hO5Fjmg	31f3a821-66c2-42eb-8def-2880197e8a7d	f	2025-04-03 06:26:33.267101+00	2025-04-03 06:26:33.267101+00	\N	733241d6-054d-4e3e-bf06-310dca382bc5
00000000-0000-0000-0000-000000000000	18	wVa0nnaMXMpm6OEOpkmtng	b47428a9-2529-4a4a-b02f-5c42648e88a9	t	2025-04-03 19:47:21.369784+00	2025-04-03 21:56:20.65999+00	\N	bec1f936-4b9c-497a-9455-f341b87dbb56
00000000-0000-0000-0000-000000000000	19	netgtkIOGkdX7UZt-Z6tog	b47428a9-2529-4a4a-b02f-5c42648e88a9	t	2025-04-03 21:56:20.662307+00	2025-04-03 22:55:03.190798+00	wVa0nnaMXMpm6OEOpkmtng	bec1f936-4b9c-497a-9455-f341b87dbb56
00000000-0000-0000-0000-000000000000	21	f30JdpmOnafZsqrxH_3WQw	b47428a9-2529-4a4a-b02f-5c42648e88a9	f	2025-04-03 22:55:03.192733+00	2025-04-03 22:55:03.192733+00	netgtkIOGkdX7UZt-Z6tog	bec1f936-4b9c-497a-9455-f341b87dbb56
00000000-0000-0000-0000-000000000000	22	xesCDbZSGg4SsUhaAchziA	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-03 23:31:41.966712+00	2025-04-03 23:31:41.966712+00	\N	eae19aa7-4c5a-45bc-a49d-4cf41d135afb
00000000-0000-0000-0000-000000000000	23	uJStaFd2C2HK24OcReKwrw	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-03 23:34:07.037104+00	2025-04-03 23:34:07.037104+00	\N	81b83de8-6521-4406-9d88-1baf1042a934
00000000-0000-0000-0000-000000000000	24	apL88LEGvGqKf6XPhmnZaQ	ecdca837-6a64-41a9-9642-196ffac92612	f	2025-04-03 23:35:30.819645+00	2025-04-03 23:35:30.819645+00	\N	e653fdea-2a0c-43ed-a035-03f67dea0255
00000000-0000-0000-0000-000000000000	25	NUICP_l0gER7NTa3XXvWow	ecdca837-6a64-41a9-9642-196ffac92612	f	2025-04-03 23:36:09.871263+00	2025-04-03 23:36:09.871263+00	\N	347e93a6-93fb-4ec7-aea7-622a5f6e7593
00000000-0000-0000-0000-000000000000	29	9uQ82y2CWUaPcgtqWOgWfQ	564b41de-e4a1-4e56-bff7-c0681abc0718	f	2025-04-04 00:29:14.805298+00	2025-04-04 00:29:14.805298+00	\N	7a31d097-c55a-4018-b588-4fe9d1c7504f
00000000-0000-0000-0000-000000000000	30	dSympK4auz0n_fLteFFPSw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-04 00:30:29.012448+00	2025-04-04 04:32:33.662516+00	\N	f45c7343-bb68-4116-9c42-51817358d703
00000000-0000-0000-0000-000000000000	31	kUFMX9DNtKFn4B0fh3JvIw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-04 04:32:33.66472+00	2025-04-04 05:30:35.456055+00	dSympK4auz0n_fLteFFPSw	f45c7343-bb68-4116-9c42-51817358d703
00000000-0000-0000-0000-000000000000	32	7jQyo9CPGZ8KECUR2mGgNA	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-04 05:30:35.460039+00	2025-04-04 06:31:05.264331+00	kUFMX9DNtKFn4B0fh3JvIw	f45c7343-bb68-4116-9c42-51817358d703
00000000-0000-0000-0000-000000000000	33	zO13JbcIq7aa0BNWfPEcig	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-04 06:31:05.269985+00	2025-04-04 08:03:10.168333+00	7jQyo9CPGZ8KECUR2mGgNA	f45c7343-bb68-4116-9c42-51817358d703
00000000-0000-0000-0000-000000000000	34	80EHxjdx5yqPDOl-CaXp9Q	564b41de-e4a1-4e56-bff7-c0681abc0718	f	2025-04-04 08:03:10.172861+00	2025-04-04 08:03:10.172861+00	zO13JbcIq7aa0BNWfPEcig	f45c7343-bb68-4116-9c42-51817358d703
00000000-0000-0000-0000-000000000000	35	6rF5UW2WUXIJM9cbKBObaw	564b41de-e4a1-4e56-bff7-c0681abc0718	f	2025-04-04 08:03:29.668719+00	2025-04-04 08:03:29.668719+00	\N	0e58ad5a-2204-4502-9aee-d1d433ca2f8b
00000000-0000-0000-0000-000000000000	36	34rYNZvWRj6E3GxFpx8Fiw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-04 08:37:41.633099+00	2025-04-04 09:36:23.558618+00	\N	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	28	nmin7fopOVJrAyY02C1GSw	5314bfcf-8401-457f-b7a7-2221ea64777c	t	2025-04-04 00:22:36.002798+00	2025-04-04 19:39:10.011009+00	\N	953b73f9-8476-48d3-ace2-5b10992121ea
00000000-0000-0000-0000-000000000000	38	yRbd6ArKfOSDpMsF_KwhuQ	5314bfcf-8401-457f-b7a7-2221ea64777c	f	2025-04-04 19:39:10.017127+00	2025-04-04 19:39:10.017127+00	nmin7fopOVJrAyY02C1GSw	953b73f9-8476-48d3-ace2-5b10992121ea
00000000-0000-0000-0000-000000000000	39	Tq_ezJQbeH891mgO1KOGQw	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-04 19:40:52.565578+00	2025-04-04 21:00:30.563688+00	\N	1e42d3df-93ea-4244-861a-66dc0fa77519
00000000-0000-0000-0000-000000000000	40	faqoZSzZ-kVxbktGp9wxmA	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-04 21:00:30.568673+00	2025-04-04 21:00:30.568673+00	Tq_ezJQbeH891mgO1KOGQw	1e42d3df-93ea-4244-861a-66dc0fa77519
00000000-0000-0000-0000-000000000000	43	kiLx4qxxaBXPa-rJpIHGDg	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-04 21:09:45.905269+00	2025-04-04 21:09:45.905269+00	\N	357ed060-0e3f-4905-b8b1-62f07e7bfb2e
00000000-0000-0000-0000-000000000000	46	MpdkjLu_EkjGg8AXY1V_xw	dee4835c-764c-40fb-bf0b-3bff8a0457d4	f	2025-04-04 22:41:50.1047+00	2025-04-04 22:41:50.1047+00	\N	2de106ed-45b8-48bc-99f9-7a8b7dbbe143
00000000-0000-0000-0000-000000000000	47	i6CYasNLtA5IzPMD2eDH8Q	dee4835c-764c-40fb-bf0b-3bff8a0457d4	f	2025-04-04 22:42:21.388042+00	2025-04-04 22:42:21.388042+00	\N	cb0ef6db-3928-456b-bb08-02a7817dc531
00000000-0000-0000-0000-000000000000	49	GDv6Z_oH6duE1jjPv4arTg	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-04 22:57:17.540246+00	2025-04-04 22:57:17.540246+00	\N	a84d8879-7ad4-40b4-93e1-2a4d44f64e1c
00000000-0000-0000-0000-000000000000	51	CbkSnEaFqS2Hg7QXHsbK7A	9d6ddaee-5f7c-4cef-8705-6db6a8d11109	f	2025-04-04 23:08:43.140644+00	2025-04-04 23:08:43.140644+00	\N	48596cd3-600f-4b74-9120-649bd3f269d5
00000000-0000-0000-0000-000000000000	52	fkvZDQlxpgeI1XJ5tapsMg	c3886a9b-c360-4fec-b16d-058747789ee2	f	2025-04-04 23:16:23.830149+00	2025-04-04 23:16:23.830149+00	\N	869e3abf-7e8a-47f2-a832-6ca24973903e
00000000-0000-0000-0000-000000000000	44	Ga5yDQ9-Uisrwq-o76QCmg	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-04 21:10:08.11391+00	2025-04-04 23:29:28.549589+00	\N	4fca3c70-db1b-4df9-b886-2128414bfff2
00000000-0000-0000-0000-000000000000	50	1EwUXnKMYHa7-qBmPf3gPA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-04 22:57:33.037898+00	2025-04-05 00:04:46.019802+00	\N	85c6b0e3-9366-4ce2-b77b-25026aa62922
00000000-0000-0000-0000-000000000000	55	f6nLr7rJgcv9XigGrb5OoA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-05 00:04:46.022759+00	2025-04-07 06:04:40.711475+00	1EwUXnKMYHa7-qBmPf3gPA	85c6b0e3-9366-4ce2-b77b-25026aa62922
00000000-0000-0000-0000-000000000000	56	pZF4RHe4B24t5l3gGko-Aw	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-07 06:04:40.719648+00	2025-04-07 06:04:40.719648+00	f6nLr7rJgcv9XigGrb5OoA	85c6b0e3-9366-4ce2-b77b-25026aa62922
00000000-0000-0000-0000-000000000000	57	9tLNJEcDm2b4Ernh5sXGGA	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-07 06:04:47.008597+00	2025-04-07 06:04:47.008597+00	\N	88c69472-f73c-4cd4-a282-29729ccfacfb
00000000-0000-0000-0000-000000000000	58	ixUokxyY3P9iVSx97896xQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-07 06:11:17.106291+00	2025-04-07 06:11:17.106291+00	\N	3b4835ff-150d-411c-9163-e901122cd92c
00000000-0000-0000-0000-000000000000	59	Lwf2You1gau4bJjV9mRtfg	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-07 06:18:07.78622+00	2025-04-07 07:53:26.873239+00	\N	e356093c-d48d-4593-ad76-c0f8f198215e
00000000-0000-0000-0000-000000000000	53	NuSi6lS_I-w1fQpW05dWlQ	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-04 23:22:14.019814+00	2025-04-07 19:38:49.201543+00	\N	d213db54-7020-4fa5-8e48-069ed093578d
00000000-0000-0000-0000-000000000000	37	am_VJCwyFLnAX5WwLv-01A	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-04 09:36:23.562885+00	2025-04-07 19:48:17.52895+00	34rYNZvWRj6E3GxFpx8Fiw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	60	jZZpOHVRnqi0ypumiBRi7g	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-07 07:53:26.881374+00	2025-04-07 20:04:43.689383+00	Lwf2You1gau4bJjV9mRtfg	e356093c-d48d-4593-ad76-c0f8f198215e
00000000-0000-0000-0000-000000000000	42	QDhkKQQFgdMYIsVz7iiq9Q	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	t	2025-04-04 21:09:21.557608+00	2025-04-07 20:07:58.081337+00	\N	d7992f80-8d49-452e-b502-35b830be963a
00000000-0000-0000-0000-000000000000	62	zUkuejFgY0Q9dgCjf_VWaQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-07 19:48:17.531004+00	2025-04-07 20:46:47.173966+00	am_VJCwyFLnAX5WwLv-01A	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	61	Q5OJ7RQHDE71Acb31oMVLg	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-07 19:38:49.206929+00	2025-04-07 20:48:03.559323+00	NuSi6lS_I-w1fQpW05dWlQ	d213db54-7020-4fa5-8e48-069ed093578d
00000000-0000-0000-0000-000000000000	66	C-EtP4YFQd3fLCyuV8FKOw	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-07 20:48:03.560031+00	2025-04-07 20:48:03.560031+00	Q5OJ7RQHDE71Acb31oMVLg	d213db54-7020-4fa5-8e48-069ed093578d
00000000-0000-0000-0000-000000000000	68	IGxbem7yLVSJmxTwuixSMg	a57aab4d-0c82-479b-91cd-2502a0c7dac8	f	2025-04-07 20:53:47.20409+00	2025-04-07 20:53:47.20409+00	\N	13e2f0a4-5a4f-4f0e-b465-91837ab82d2c
00000000-0000-0000-0000-000000000000	63	aIHVEIaBUjRaAYKymstK9g	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-07 20:04:43.690953+00	2025-04-07 21:02:51.068791+00	jZZpOHVRnqi0ypumiBRi7g	e356093c-d48d-4593-ad76-c0f8f198215e
00000000-0000-0000-0000-000000000000	69	lgfNBAD9KJj2jIRZV2TZ7g	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-07 21:02:51.070377+00	2025-04-07 21:02:51.070377+00	aIHVEIaBUjRaAYKymstK9g	e356093c-d48d-4593-ad76-c0f8f198215e
00000000-0000-0000-0000-000000000000	64	SXLxPcoSH81CtzvRlwSZNw	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	t	2025-04-07 20:07:58.082098+00	2025-04-07 21:09:08.952609+00	QDhkKQQFgdMYIsVz7iiq9Q	d7992f80-8d49-452e-b502-35b830be963a
00000000-0000-0000-0000-000000000000	65	7zhDKnqeML8lkNhkqYvNeg	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-07 20:46:47.175896+00	2025-04-07 21:45:30.437591+00	zUkuejFgY0Q9dgCjf_VWaQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	54	b5TFQMzrX4TXpXqH9EAkBg	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-04 23:29:28.553243+00	2025-04-07 21:49:40.053685+00	Ga5yDQ9-Uisrwq-o76QCmg	4fca3c70-db1b-4df9-b886-2128414bfff2
00000000-0000-0000-0000-000000000000	70	N_sjk6sLNVH4RNbbgwGLKg	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	f	2025-04-07 21:09:08.955339+00	2025-04-07 21:09:08.955339+00	SXLxPcoSH81CtzvRlwSZNw	d7992f80-8d49-452e-b502-35b830be963a
00000000-0000-0000-0000-000000000000	71	RrFKwYr14lpZvNeaqO12gw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-07 21:40:35.131604+00	2025-04-07 21:40:35.131604+00	\N	48c8598d-bb2a-43f1-9d25-36462d3e8c76
00000000-0000-0000-0000-000000000000	75	QgM89_8W2zePN_9MPR9uMg	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-07 21:49:40.057753+00	2025-04-07 21:49:40.057753+00	b5TFQMzrX4TXpXqH9EAkBg	4fca3c70-db1b-4df9-b886-2128414bfff2
00000000-0000-0000-0000-000000000000	76	_aVLmjWUt4HW-yl1xQXAhw	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-07 21:49:41.439423+00	2025-04-07 21:49:41.439423+00	\N	97af4dbc-bc49-480b-a851-142d4eaaf6df
00000000-0000-0000-0000-000000000000	77	dcwqdv9YMPDnMpeJKdn_mg	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-07 22:00:08.379614+00	2025-04-07 23:16:29.641859+00	\N	6bac3d94-89e9-48a8-806e-f660cc2f3f64
00000000-0000-0000-0000-000000000000	78	79oZ1NZwlZUFID52Wzqrkw	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-07 23:16:29.645606+00	2025-04-07 23:16:29.645606+00	dcwqdv9YMPDnMpeJKdn_mg	6bac3d94-89e9-48a8-806e-f660cc2f3f64
00000000-0000-0000-0000-000000000000	73	EOjaEHCcrqDML3cRhUDehQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-07 21:45:30.440868+00	2025-04-07 23:17:00.02867+00	7zhDKnqeML8lkNhkqYvNeg	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	79	03htvI3LIBsGTy4icya8Sw	564b41de-e4a1-4e56-bff7-c0681abc0718	f	2025-04-07 23:17:00.029321+00	2025-04-07 23:17:00.029321+00	EOjaEHCcrqDML3cRhUDehQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	72	tuogQxD9ZtRZcPxikypQ4g	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-07 21:41:29.275449+00	2025-04-07 23:20:37.313504+00	\N	20c3aa32-bdab-4507-ba93-277b988c5e88
00000000-0000-0000-0000-000000000000	80	njE1rD7Ba262eA8y_u0jbw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-07 23:20:37.314867+00	2025-04-07 23:20:37.314867+00	tuogQxD9ZtRZcPxikypQ4g	20c3aa32-bdab-4507-ba93-277b988c5e88
00000000-0000-0000-0000-000000000000	81	VJOXt3qZD-sGIDPledVYGg	6eb32f88-231e-4237-9f93-6689a94b624d	f	2025-04-07 23:22:47.11022+00	2025-04-07 23:22:47.11022+00	\N	23d60cde-7e1f-4b09-9fc5-c1ee1aa38707
00000000-0000-0000-0000-000000000000	82	MiwHLK3rT8IWnD6mPu8d_w	2eadd525-41bd-4c5d-9073-faf9c6b91714	f	2025-04-07 23:24:17.058544+00	2025-04-07 23:24:17.058544+00	\N	7076da94-128a-49a0-83ec-44cbdf37a44b
00000000-0000-0000-0000-000000000000	74	amITdUffA2-SIkyDFyh-9A	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-07 21:46:59.965465+00	2025-04-07 23:27:03.240672+00	\N	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	83	UBsgqHzePJ4ALLxAHJo1ZA	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-07 23:27:03.244701+00	2025-04-07 23:27:03.244701+00	amITdUffA2-SIkyDFyh-9A	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	84	uahr0Fg9x3HbWNDRYYxtvw	31fbe58a-c798-401a-b2aa-c06726293956	f	2025-04-07 23:30:10.223972+00	2025-04-07 23:30:10.223972+00	\N	a1291826-8325-46d8-a380-7f1b5910c5e4
00000000-0000-0000-0000-000000000000	85	gZBvQjHk9HYWm2IRYCZv-w	0e41703f-9367-446f-ab66-0c5477edda65	f	2025-04-07 23:34:08.08368+00	2025-04-07 23:34:08.08368+00	\N	a82dfff5-488c-451d-9b51-8489f373de8f
00000000-0000-0000-0000-000000000000	86	PZKA8CMZKUXLs4V6yj2xrA	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-07 23:35:55.724559+00	2025-04-07 23:35:55.724559+00	\N	bd306676-f60a-4666-a038-5c80d3c4efe7
00000000-0000-0000-0000-000000000000	87	zCSJSx6JVK-O02Yph3EBhg	a004e928-2b22-4749-ad53-9232297705be	f	2025-04-07 23:37:10.574206+00	2025-04-07 23:37:10.574206+00	\N	12276b70-03e0-4dd9-b0bb-44f782a60260
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY "pgsodium"."key" ("id", "status", "created", "expires", "key_type", "key_id", "key_context", "name", "associated_data", "raw_key", "raw_key_nonce", "parent_key", "comment", "user_data") FROM stdin;
\.


--
-- Data for Name: Administrador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Administrador" ("id", "created_at") FROM stdin;
\.


--
-- Data for Name: Contacto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Contacto" ("PK_Contacto", "Email", "Num_Telefono") FROM stdin;
28d6a104-d3dd-4967-88f5-bde0c7f9057c	john.doe@example.com	987654321
a1dd3af4-1807-4d20-bdef-6bb13d67eab1	jane.smith@example.com	1234567890
\.


--
-- Data for Name: Departamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Departamento" ("ID_Departamento", "Nombre", "Descripcion") FROM stdin;
4a349d40-f10f-46f7-9465-259a1669f2b2	IT	Information Technology
2665a062-12cf-4d0a-9e4b-f3805418a6a8	HR	Human Resources
dd6c79f7-80fd-48b3-97f6-119551d3d2c3	TI	zxcbzkxhc
46e63a6e-e0b1-4d27-b213-94005e83de75	ALMS	ansjkxnaksnuaa
31560a35-62a5-4020-9eb4-c211aee51a66	nx z	zjx z
a337fc73-b929-4ce7-b71b-5c3c0ad45e06	hola	aiosnxia
ed9080ea-30ce-4599-9fad-12e29663d602	hbjh	jhj
\.


--
-- Data for Name: Empleado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Empleado" ("ID_Empleado", "Nombre", "Rol", "ID_Departamento", "Nivel", "Cargabilidad", "ID_CapabilityLead", "FechaContratacion", "FechaUltNivel", "Contacto_ID", "ID_PeopleLead") FROM stdin;
7478c90f-4de7-494d-ae79-fc28756dc4ab	rick	skjxn	\N	12	\N	\N	\N	\N	\N	\N
b47428a9-2529-4a4a-b02f-5c42648e88a9	Isaac	ajksnkc	\N	12	\N	\N	\N	\N	\N	\N
5314bfcf-8401-457f-b7a7-2221ea64777c	Betanzo	dhxbs	\N	12	\N	\N	\N	\N	\N	\N
17be3a68-8d97-4557-85e8-8e8cc9ecbc13	david	dev	\N	1	\N	\N	\N	\N	\N	\N
9950b2e9-632f-42ff-b259-726ede4e408f	Emir 	El mejor de todos 	\N	10	\N	\N	\N	\N	\N	\N
dee4835c-764c-40fb-bf0b-3bff8a0457d4	Pancho Naranjas	maestro de s teorico	\N	12	\N	\N	\N	\N	\N	\N
ff98b050-236d-4a28-8aea-567f03b9f3c3	Ramón Antonio Naranjo Sarmiento	s master 2	\N	12	\N	\N	\N	\N	\N	\N
9d6ddaee-5f7c-4cef-8705-6db6a8d11109	yi	jsasnxkj	\N	akjsxnaks	0%	\N	\N	\N	\N	\N
c3886a9b-c360-4fec-b16d-058747789ee2	aksc	jnXKj	\N	12	0%	\N	2025-04-04	2025-04-04	\N	\N
b3f42013-85ab-406b-b823-89ab1da60b82	John Doe	Developer	4a349d40-f10f-46f7-9465-259a1669f2b2	Senior	80%	750242c6-e9f3-4c20-bb49-f39fc02fcc51	\N	\N	28d6a104-d3dd-4967-88f5-bde0c7f9057c	a02d6134-314f-4c1e-a1e2-9594df42bf01
9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	Jane Smith	HR Manager	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Manager	100%	3660958c-1eaa-4b94-aef2-88570ab6613d	\N	\N	a1dd3af4-1807-4d20-bdef-6bb13d67eab1	d87e4b98-e814-4409-9d30-1d93333b46ca
a57aab4d-0c82-479b-91cd-2502a0c7dac8	Sergio  r	ajklsbxjhc	2665a062-12cf-4d0a-9e4b-f3805418a6a8	12	0%	\N	2025-04-07	2025-04-07	\N	\N
7dfad126-2905-431a-829b-fcae851fe102	David	Dev	4a349d40-f10f-46f7-9465-259a1669f2b2	10	0%	\N	2025-04-07	2025-04-07	\N	\N
6eb32f88-231e-4237-9f93-6689a94b624d	sd	asda	2665a062-12cf-4d0a-9e4b-f3805418a6a8	12	0%	\N	2025-04-07	2025-04-07	\N	\N
2eadd525-41bd-4c5d-9073-faf9c6b91714	Auch	devops	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-07	2025-04-07	\N	\N
31fbe58a-c798-401a-b2aa-c06726293956	test	jaisn	4a349d40-f10f-46f7-9465-259a1669f2b2	11	0%	\N	2025-04-07	2025-04-07	\N	\N
0e41703f-9367-446f-ab66-0c5477edda65	ajsn	an	a337fc73-b929-4ce7-b71b-5c3c0ad45e06	11	0%	\N	2025-04-07	2025-04-07	\N	\N
a004e928-2b22-4749-ad53-9232297705be	kns	qwe	46e63a6e-e0b1-4d27-b213-94005e83de75	12	0%	\N	2025-04-07	2025-04-07	\N	\N
\.


--
-- Data for Name: Capability_Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Capability_Lead" ("ID_CapabilityLead", "Nombre", "ID_Departamento", "Rol", "ID_Empleado") FROM stdin;
750242c6-e9f3-4c20-bb49-f39fc02fcc51	Charlie Green	4a349d40-f10f-46f7-9465-259a1669f2b2	Capability Manager	b3f42013-85ab-406b-b823-89ab1da60b82
3660958c-1eaa-4b94-aef2-88570ab6613d	Diana White	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Capability Lead	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
\.


--
-- Data for Name: Certificados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Certificados" ("ID_Certificado", "Nombre", "Fecha_caducidad", "Documento", "ID_Empleado") FROM stdin;
\.


--
-- Data for Name: Cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Cliente" ("PK_Cliente", "Nombre", "RFC", "ID_Contacto") FROM stdin;
3e301b16-bda6-4a2b-ba5c-b9f2393c9b14	Acme Corp	ACM123456	28d6a104-d3dd-4967-88f5-bde0c7f9057c
225a0afe-646d-491e-b4aa-238a0772bcc2	Globex Inc	GLB654321	a1dd3af4-1807-4d20-bdef-6bb13d67eab1
\.


--
-- Data for Name: Cursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Cursos" ("ID_Curso", "Nombre", "Progreso", "Status", "Fecha_fin_curso", "ID_Empleado") FROM stdin;
5f5bbec7-f37a-4d7a-83a3-3e2b6780e700	React Development	50%	Ongoing	2025-05-15	b3f42013-85ab-406b-b823-89ab1da60b82
b855f167-1544-4b59-b7df-0b6cc9e771c0	Leadership Training	100%	Completed	2025-03-01	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
\.


--
-- Data for Name: Delivery_Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Delivery_Lead" ("ID_DeliveryLead", "Nombre", "Rol", "Nivel", "ID_Contacto") FROM stdin;
536e085a-fb2e-4c56-892d-35625a943941	Alice Johnson	Delivery Manager	Senior	28d6a104-d3dd-4967-88f5-bde0c7f9057c
c30266b2-324d-442c-8702-b99ece958f29	Bob Brown	Delivery Lead	Mid	a1dd3af4-1807-4d20-bdef-6bb13d67eab1
\.


--
-- Data for Name: Direccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Direccion" ("PK_Direccion", "Calle", "Estado", "Pais", "Ciudad", "Num_Casa", "ID_Cliente") FROM stdin;
a8643749-9adb-41b6-9150-4bedd160034c	123 Main St	California	USA	Los Angeles	101	3e301b16-bda6-4a2b-ba5c-b9f2393c9b14
c419244a-cbaf-48d8-986d-7addd00b14c5	456 Elm St	New York	USA	New York City	202	225a0afe-646d-491e-b4aa-238a0772bcc2
\.


--
-- Data for Name: Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Habilidades" ("ID_Habilidad", "Tipo", "Descripcion", "ID_Empleado") FROM stdin;
6cf4dbcf-058b-4a42-b48a-6e33272bde60	hard	JavaScript Development	ff98b050-236d-4a28-8aea-567f03b9f3c3
a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb	soft	Team Leadership	ff98b050-236d-4a28-8aea-567f03b9f3c3
5d3bad23-c29d-4f5c-9911-aeb084227398	interest	Puto emir no lee	ff98b050-236d-4a28-8aea-567f03b9f3c3
36a5b1cc-971b-49a1-945c-790da3403e70	soft	suavecito	ff98b050-236d-4a28-8aea-567f03b9f3c3
\.


--
-- Data for Name: Empleado_Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Empleado_Habilidades" ("ID_Empleado", "ID_Habilidad") FROM stdin;
b3f42013-85ab-406b-b823-89ab1da60b82	6cf4dbcf-058b-4a42-b48a-6e33272bde60
9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb
\.


--
-- Data for Name: People_lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."People_lead" ("ID", "ID_Empleado") FROM stdin;
a02d6134-314f-4c1e-a1e2-9594df42bf01	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
d87e4b98-e814-4409-9d30-1d93333b46ca	b3f42013-85ab-406b-b823-89ab1da60b82
\.


--
-- Data for Name: FeedBack; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."FeedBack" ("ID_FeedBack", "ID_People_lead", "ID_Empleado", "Descripcion", "AreaMejora", "Desempeno") FROM stdin;
63ed1dcb-8c9a-407d-9d02-592e8f5b7a4b	d87e4b98-e814-4409-9d30-1d93333b46ca	b3f42013-85ab-406b-b823-89ab1da60b82	Great work on the project	Time management	Excellent
831e63de-9398-4fdf-a250-88c039dc028b	a02d6134-314f-4c1e-a1e2-9594df42bf01	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	Good leadership skills	Recruitment strategies	Good
\.


--
-- Data for Name: Metas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Metas" ("ID_meta", "Nombre", "Tipo_Meta", "Plazo", "Descripcion", "Fecha_limite", "ID_Empleado", "ID_Revisor", "Registrada", "Estado", "Self_Reflection") FROM stdin;
91e3e15b-59c5-4060-849b-d373432f41bc	Complete Project A	Short-term	3 months	Deliver Project A on time	2025-06-30	b3f42013-85ab-406b-b823-89ab1da60b82	d87e4b98-e814-4409-9d30-1d93333b46ca	t	In Progress	Need to improve time management
1a0023f2-9b81-40cd-99a9-62bcb8d4ef2a	Hire 5 Employees	Long-term	6 months	Expand the HR team	2025-12-31	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	a02d6134-314f-4c1e-a1e2-9594df42bf01	t	Not Started	Focus on recruitment strategies
\.


--
-- Data for Name: People_lead_Empleado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."People_lead_Empleado" ("ID_People_lead", "ID_Empleado") FROM stdin;
a02d6134-314f-4c1e-a1e2-9594df42bf01	b3f42013-85ab-406b-b823-89ab1da60b82
d87e4b98-e814-4409-9d30-1d93333b46ca	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
\.


--
-- Data for Name: Proyectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Proyectos" ("ID_Proyecto", "Nombre", "ID_Cliente", "Descripcion", "Status", "ID_DeliveryLead") FROM stdin;
fd74db87-2a0e-44d6-a6d4-ef6a3dbb6576	Project Alpha	3e301b16-bda6-4a2b-ba5c-b9f2393c9b14	Develop a new web application	In Progress	536e085a-fb2e-4c56-892d-35625a943941
bdc44c38-20e4-4122-837f-1d7ee38b21a5	Project Beta	225a0afe-646d-491e-b4aa-238a0772bcc2	Implement HR software	Completed	c30266b2-324d-442c-8702-b99ece958f29
08115d0e-2ddf-4597-b331-898d8b29d73f	Proyecto prueba	225a0afe-646d-491e-b4aa-238a0772bcc2	descripcion prueba	En progreso	536e085a-fb2e-4c56-892d-35625a943941
00f3efd0-d137-4137-bf5a-711b5a66e2cc	Prueba	225a0afe-646d-491e-b4aa-238a0772bcc2	prueba	En progreso	536e085a-fb2e-4c56-892d-35625a943941
4b7f7fd7-8692-41ed-85f9-c6f733ec29b2	Prueba	225a0afe-646d-491e-b4aa-238a0772bcc2	Prueba	En progreso	536e085a-fb2e-4c56-892d-35625a943941
3ad30d1a-c7c2-4766-a83a-feaf260417cd	asd	225a0afe-646d-491e-b4aa-238a0772bcc2	asd	En progreso	536e085a-fb2e-4c56-892d-35625a943941
40c39617-ce2c-48cb-8310-af21571627a1	test	225a0afe-646d-491e-b4aa-238a0772bcc2	t	En progreso	536e085a-fb2e-4c56-892d-35625a943941
6e666601-5362-469b-8d3b-24b2d6e7210a	testadsonusasdonu	225a0afe-646d-491e-b4aa-238a0772bcc2	testaadsasdas	En progreso	536e085a-fb2e-4c56-892d-35625a943941
\.


--
-- Data for Name: Proyecto_Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Proyecto_Habilidades" ("ID_Proyecto", "ID_Habilidad") FROM stdin;
fd74db87-2a0e-44d6-a6d4-ef6a3dbb6576	6cf4dbcf-058b-4a42-b48a-6e33272bde60
bdc44c38-20e4-4122-837f-1d7ee38b21a5	a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb
\.


--
-- Data for Name: Puestos_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Puestos_proyecto" ("ID_Proyecto", "ID_Empleado", "Puesto") FROM stdin;
fd74db87-2a0e-44d6-a6d4-ef6a3dbb6576	b3f42013-85ab-406b-b823-89ab1da60b82	Developer
bdc44c38-20e4-4122-837f-1d7ee38b21a5	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	HR Specialist
00f3efd0-d137-4137-bf5a-711b5a66e2cc	\N	
40c39617-ce2c-48cb-8310-af21571627a1	\N	
\.


--
-- Data for Name: Talent_Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Talent_Lead" ("ID_TalentLead", "Nombre", "ID_Departamento", "Rol", "Nivel", "ID_Contacto") FROM stdin;
fb8d3db5-bf72-4a79-8b1e-f3691fc6d8c8	Eve Black	4a349d40-f10f-46f7-9465-259a1669f2b2	Talent Manager	Senior	28d6a104-d3dd-4967-88f5-bde0c7f9057c
ad890a10-57a0-45ef-a809-b01cd55ba971	Frank Gray	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Talent Lead	Mid	a1dd3af4-1807-4d20-bdef-6bb13d67eab1
\.


--
-- Data for Name: Talent_Discussion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Talent_Discussion" ("ID_TalentDiscussion", "Discussion", "ID_TalentLead", "ID_DeliveryLead", "ID_CapabilityLead", "ID_People_lead") FROM stdin;
186ffa0f-c2df-41a0-a3e8-300180d80f5f	Discussing employee performance	fb8d3db5-bf72-4a79-8b1e-f3691fc6d8c8	536e085a-fb2e-4c56-892d-35625a943941	750242c6-e9f3-4c20-bb49-f39fc02fcc51	d87e4b98-e814-4409-9d30-1d93333b46ca
74b92724-a46e-4010-bf3b-af1364599b90	Planning recruitment strategies	ad890a10-57a0-45ef-a809-b01cd55ba971	c30266b2-324d-442c-8702-b99ece958f29	3660958c-1eaa-4b94-aef2-88570ab6613d	a02d6134-314f-4c1e-a1e2-9594df42bf01
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 87, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
