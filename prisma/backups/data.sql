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
00000000-0000-0000-0000-000000000000	564b41de-e4a1-4e56-bff7-c0681abc0718	authenticated	authenticated	a01198676@tec.mx	$2a$10$OWdlCJDTVT2YUv65UgEuIubEYL9cPUJ.vq.1hmBC8poIp/M3Jh4wq	2025-04-04 00:05:14.081829+00	\N		\N		\N			\N	2025-04-04 08:37:41.63076+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-04-04 00:05:14.078028+00	2025-04-04 09:36:23.564066+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	5314bfcf-8401-457f-b7a7-2221ea64777c	authenticated	authenticated	a01198327@tec.mx	$2a$10$PGTXzuYGOmd69KgBNolwFOnrdXRyd16KK0w.a4tByaYt4/Xx.X0Ju	2025-04-04 00:22:35.993504+00	\N		\N		\N			\N	2025-04-04 00:22:35.998489+00	{"provider": "email", "providers": ["email"]}	{"sub": "5314bfcf-8401-457f-b7a7-2221ea64777c", "name": "Betanzo", "role": "employee", "email": "a01198327@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-04 00:22:35.978162+00	2025-04-04 19:39:10.021537+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7478c90f-4de7-494d-ae79-fc28756dc4ab	authenticated	authenticated	a01741300@tec.mx	$2a$10$owQpDbpAjPcrHR7s7B0MWOlIDVtRxarymDgdjSh7gohAN3B6cm8GO	2025-04-03 07:26:01.05692+00	\N		\N		\N			\N	2025-04-04 19:40:52.56102+00	{"provider": "email", "providers": ["email"]}	{"sub": "7478c90f-4de7-494d-ae79-fc28756dc4ab", "name": "rick", "role": "employee", "email": "a01741300@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-03 07:26:01.049841+00	2025-04-04 21:00:30.569916+00	\N	\N			\N		0	\N		\N	f	\N	f
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
c6efa894-a00f-4d8f-8e9f-d5d13662571a	564b41de-e4a1-4e56-bff7-c0681abc0718	2025-04-04 08:37:41.630831+00	2025-04-04 09:36:23.574155+00	\N	aal1	\N	2025-04-04 09:36:23.574063	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	189.159.103.134	\N
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
00000000-0000-0000-0000-000000000000	37	am_VJCwyFLnAX5WwLv-01A	564b41de-e4a1-4e56-bff7-c0681abc0718	f	2025-04-04 09:36:23.562885+00	2025-04-04 09:36:23.562885+00	34rYNZvWRj6E3GxFpx8Fiw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	28	nmin7fopOVJrAyY02C1GSw	5314bfcf-8401-457f-b7a7-2221ea64777c	t	2025-04-04 00:22:36.002798+00	2025-04-04 19:39:10.011009+00	\N	953b73f9-8476-48d3-ace2-5b10992121ea
00000000-0000-0000-0000-000000000000	38	yRbd6ArKfOSDpMsF_KwhuQ	5314bfcf-8401-457f-b7a7-2221ea64777c	f	2025-04-04 19:39:10.017127+00	2025-04-04 19:39:10.017127+00	nmin7fopOVJrAyY02C1GSw	953b73f9-8476-48d3-ace2-5b10992121ea
00000000-0000-0000-0000-000000000000	39	Tq_ezJQbeH891mgO1KOGQw	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-04 19:40:52.565578+00	2025-04-04 21:00:30.563688+00	\N	1e42d3df-93ea-4244-861a-66dc0fa77519
00000000-0000-0000-0000-000000000000	40	faqoZSzZ-kVxbktGp9wxmA	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-04 21:00:30.568673+00	2025-04-04 21:00:30.568673+00	Tq_ezJQbeH891mgO1KOGQw	1e42d3df-93ea-4244-861a-66dc0fa77519
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
-- Data for Name: Contacto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Contacto" ("PK_Contacto", "Email") FROM stdin;
28d6a104-d3dd-4967-88f5-bde0c7f9057c	john.doe@example.com
a1dd3af4-1807-4d20-bdef-6bb13d67eab1	jane.smith@example.com
\.


--
-- Data for Name: Departamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Departamento" ("ID_Departamento", "Nombre", "Descripcion") FROM stdin;
4a349d40-f10f-46f7-9465-259a1669f2b2	IT	Information Technology
2665a062-12cf-4d0a-9e4b-f3805418a6a8	HR	Human Resources
\.


--
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Usuario" ("ID_Usuario", "Username", "Password") FROM stdin;
1601fe30-c091-483c-aae7-36d7ad6e7524	User1	password1
07a55f60-8b08-4992-ba22-e4204a4260e1	User2	password2
\.


--
-- Data for Name: Empleado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Empleado" ("ID_Empleado", "Nombre", "Rol", "ID_Departamento", "Nivel", "Cargabilidad", "ID_Contacto", "ID_CapabilityLead", "ID_Usuario") FROM stdin;
b3f42013-85ab-406b-b823-89ab1da60b82	John Doe	Developer	4a349d40-f10f-46f7-9465-259a1669f2b2	Senior	80%	28d6a104-d3dd-4967-88f5-bde0c7f9057c	750242c6-e9f3-4c20-bb49-f39fc02fcc51	1601fe30-c091-483c-aae7-36d7ad6e7524
9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	Jane Smith	HR Manager	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Manager	100%	a1dd3af4-1807-4d20-bdef-6bb13d67eab1	3660958c-1eaa-4b94-aef2-88570ab6613d	07a55f60-8b08-4992-ba22-e4204a4260e1
7478c90f-4de7-494d-ae79-fc28756dc4ab	rick	skjxn	\N	12	\N	\N	\N	\N
b47428a9-2529-4a4a-b02f-5c42648e88a9	Isaac	ajksnkc	\N	12	\N	\N	\N	\N
5314bfcf-8401-457f-b7a7-2221ea64777c	Betanzo	dhxbs	\N	12	\N	\N	\N	\N
d135afd9-ac46-4fdb-ad17-0648762c973d	a	\N	\N	\N	\N	\N	\N	\N
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
6ca14f16-775b-4967-ba90-8607b13fd24e	AWS Certified Developer	2025-12-31	aws_cert.pdf	b3f42013-85ab-406b-b823-89ab1da60b82
7f976888-a664-4d64-884b-547fad048935	HR Management Certification	2026-06-30	hr_cert.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
fbad078b-2eb1-4757-b9c4-4b24bf95e81f	Ratilda	2025-04-01	Ingeniero en Ingenieria	b3f42013-85ab-406b-b823-89ab1da60b82
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

COPY "public"."Habilidades" ("ID_Habilidad", "Tipo", "Descripcion") FROM stdin;
6cf4dbcf-058b-4a42-b48a-6e33272bde60	Technical	JavaScript Development
a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb	Soft Skill	Team Leadership
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

COPY "public"."People_lead" ("ID", "ID_Contacto") FROM stdin;
d87e4b98-e814-4409-9d30-1d93333b46ca	28d6a104-d3dd-4967-88f5-bde0c7f9057c
a02d6134-314f-4c1e-a1e2-9594df42bf01	a1dd3af4-1807-4d20-bdef-6bb13d67eab1
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
a02d6134-314f-4c1e-a1e2-9594df42bf01	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
d87e4b98-e814-4409-9d30-1d93333b46ca	b3f42013-85ab-406b-b823-89ab1da60b82
\.


--
-- Data for Name: Proyectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Proyectos" ("ID_Proyecto", "Nombre", "ID_Cliente", "Descripcion", "Status", "ID_DeliveryLead") FROM stdin;
fd74db87-2a0e-44d6-a6d4-ef6a3dbb6576	Project Alpha	3e301b16-bda6-4a2b-ba5c-b9f2393c9b14	Develop a new web application	In Progress	536e085a-fb2e-4c56-892d-35625a943941
bdc44c38-20e4-4122-837f-1d7ee38b21a5	Project Beta	225a0afe-646d-491e-b4aa-238a0772bcc2	Implement HR software	Completed	c30266b2-324d-442c-8702-b99ece958f29
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
-- Data for Name: Telefono; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Telefono" ("ID_Telefono", "Tipo", "Pais", "Num_Telefono", "ID_Contacto") FROM stdin;
716c096c-814a-414e-b724-c528f1c95a6c	Mobile	USA	1234567890	28d6a104-d3dd-4967-88f5-bde0c7f9057c
6c148d86-042b-4c4c-89f8-c636f4864232	Home	USA	0987654321	a1dd3af4-1807-4d20-bdef-6bb13d67eab1
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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 40, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
