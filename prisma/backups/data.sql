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
00000000-0000-0000-0000-000000000000	b5ba21f1-ad18-46a4-9e5e-75b409e947b8	{"action":"user_signedup","actor_id":"204b4114-7454-40dd-afd4-d4521f0c2558","actor_username":"a3@cd.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-08 00:06:55.656773+00	
00000000-0000-0000-0000-000000000000	5a1ec98a-3871-4800-a981-95918e95ee44	{"action":"login","actor_id":"204b4114-7454-40dd-afd4-d4521f0c2558","actor_username":"a3@cd.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-08 00:06:55.667012+00	
00000000-0000-0000-0000-000000000000	ec9214fb-309f-4dd7-9f6e-fb2cb54edd31	{"action":"user_signedup","actor_id":"392c88d5-a2c3-4a14-88d1-2d84bc8133c5","actor_username":"ajd@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-08 00:08:41.296968+00	
00000000-0000-0000-0000-000000000000	ee5a86e5-22f6-49a9-8af9-a63f90ccbefd	{"action":"login","actor_id":"392c88d5-a2c3-4a14-88d1-2d84bc8133c5","actor_username":"ajd@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-08 00:08:41.301865+00	
00000000-0000-0000-0000-000000000000	af632d73-7c01-478e-a896-4b1327f72b1e	{"action":"user_signedup","actor_id":"37a795b1-0a19-41ca-a09c-805dc258ac38","actor_username":"sd@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-08 00:16:29.31925+00	
00000000-0000-0000-0000-000000000000	b4557200-5213-49cf-abc5-92550b6da0e7	{"action":"login","actor_id":"37a795b1-0a19-41ca-a09c-805dc258ac38","actor_username":"sd@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-08 00:16:29.326362+00	
00000000-0000-0000-0000-000000000000	5cfab5b8-c16e-4a29-8abb-e29ad083c4dc	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-08 00:18:56.982773+00	
00000000-0000-0000-0000-000000000000	135a54ba-c798-46d6-807c-1be964a8c0a6	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-08 00:18:56.983759+00	
00000000-0000-0000-0000-000000000000	e80d28d9-9ff3-4b1a-9788-2c8f1b2ce80d	{"action":"user_signedup","actor_id":"a0a40b5c-c8be-40f1-ae42-d8bb32677c8e","actor_username":"kjsnd@h.co","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-08 00:23:45.389858+00	
00000000-0000-0000-0000-000000000000	60e083d5-e5bd-4ffe-842e-bd1d85b80d81	{"action":"login","actor_id":"a0a40b5c-c8be-40f1-ae42-d8bb32677c8e","actor_username":"kjsnd@h.co","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-08 00:23:45.396655+00	
00000000-0000-0000-0000-000000000000	783fcc92-e970-4e4e-9809-b2c2e60475d5	{"action":"user_signedup","actor_id":"0a38c26c-3a86-42cb-b39b-c9c76848f0e5","actor_username":"oi@c.c","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-08 00:26:00.014379+00	
00000000-0000-0000-0000-000000000000	02dd6d27-68d3-4da9-a212-b7e1ae69d451	{"action":"login","actor_id":"0a38c26c-3a86-42cb-b39b-c9c76848f0e5","actor_username":"oi@c.c","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-08 00:26:00.022566+00	
00000000-0000-0000-0000-000000000000	0b34b54e-18ff-4f02-bafc-e05693812266	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 02:52:04.338869+00	
00000000-0000-0000-0000-000000000000	b6383d36-b29f-48e9-8679-b542f153ac37	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 02:52:04.342584+00	
00000000-0000-0000-0000-000000000000	32bf871f-b6f2-4c24-b21f-aa65c927d749	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 04:10:43.322019+00	
00000000-0000-0000-0000-000000000000	6fd1e751-53e4-4511-9c2a-c6cc22b41eae	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 04:10:43.325479+00	
00000000-0000-0000-0000-000000000000	3643c074-c443-4583-ad4c-9b64c1e74733	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 05:08:46.485807+00	
00000000-0000-0000-0000-000000000000	9449ff2f-7a40-4f2b-bead-3202cdce19e6	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 05:08:46.486822+00	
00000000-0000-0000-0000-000000000000	a21b7f92-bd6b-409d-96ed-26f722f2a593	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 06:06:53.363378+00	
00000000-0000-0000-0000-000000000000	489a6b82-6b02-4b9e-96a5-497528c8f342	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 06:06:53.367036+00	
00000000-0000-0000-0000-000000000000	eac792c5-f146-4c87-a970-a396a8f9f7cb	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 07:30:34.679346+00	
00000000-0000-0000-0000-000000000000	983a58a6-3036-4351-ac62-4402a7127cea	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 07:30:34.687133+00	
00000000-0000-0000-0000-000000000000	3d7c2696-0bf1-41af-9f26-6c7d046cbca9	{"action":"token_refreshed","actor_id":"0a38c26c-3a86-42cb-b39b-c9c76848f0e5","actor_username":"oi@c.c","actor_via_sso":false,"log_type":"token"}	2025-04-08 20:24:54.251071+00	
00000000-0000-0000-0000-000000000000	6a6101c8-f3b7-4026-a814-4f25b357d531	{"action":"token_revoked","actor_id":"0a38c26c-3a86-42cb-b39b-c9c76848f0e5","actor_username":"oi@c.c","actor_via_sso":false,"log_type":"token"}	2025-04-08 20:24:54.269513+00	
00000000-0000-0000-0000-000000000000	e91f2274-75f4-4852-beb9-1ff8c4b45d73	{"action":"user_signedup","actor_id":"577146a4-87b1-4f34-9bb1-824140ff4c54","actor_username":"zi@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-08 20:27:24.911398+00	
00000000-0000-0000-0000-000000000000	35701d0b-d6d4-4a8f-b817-b81b82f720c1	{"action":"login","actor_id":"577146a4-87b1-4f34-9bb1-824140ff4c54","actor_username":"zi@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-08 20:27:24.918609+00	
00000000-0000-0000-0000-000000000000	cf6f51aa-b116-41e0-9e13-ac861516f22c	{"action":"user_repeated_signup","actor_id":"577146a4-87b1-4f34-9bb1-824140ff4c54","actor_username":"zi@tec.mx","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-08 20:27:48.517624+00	
00000000-0000-0000-0000-000000000000	dd580e8c-84b4-491b-927f-6ed05555b233	{"action":"user_signedup","actor_id":"809bf7bd-14ec-4553-9e37-90a697149799","actor_username":"zic@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-08 20:27:54.466917+00	
00000000-0000-0000-0000-000000000000	93a63c46-0319-40aa-81e9-29325d3128ca	{"action":"login","actor_id":"809bf7bd-14ec-4553-9e37-90a697149799","actor_username":"zic@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-08 20:27:54.472252+00	
00000000-0000-0000-0000-000000000000	fcf31d75-89ec-4381-9ea1-dc6293ca5436	{"action":"user_signedup","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-08 20:32:52.794053+00	
00000000-0000-0000-0000-000000000000	d5338f7e-824a-4aae-9772-94069d828a5e	{"action":"login","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-08 20:32:52.800373+00	
00000000-0000-0000-0000-000000000000	e18d58b3-bb77-418d-a32e-6baba508c4f9	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-08 21:25:25.399474+00	
00000000-0000-0000-0000-000000000000	450a5e66-cf5f-4b80-b876-bb468cbbad72	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-08 21:25:25.402234+00	
00000000-0000-0000-0000-000000000000	82e87faf-40d9-43eb-9d63-059d977d0372	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 21:29:32.350864+00	
00000000-0000-0000-0000-000000000000	47596ee0-a68c-48fd-a654-1b5bd059f0c8	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 21:29:32.351762+00	
00000000-0000-0000-0000-000000000000	bf8889cd-885d-4f8c-96d2-fa897cf68eae	{"action":"token_refreshed","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 21:32:55.53501+00	
00000000-0000-0000-0000-000000000000	9bae290e-e126-44b7-bd11-de6db96b9851	{"action":"token_revoked","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 21:32:55.537256+00	
00000000-0000-0000-0000-000000000000	3de2fcf4-3a6b-4c1f-8642-2db07e57fa86	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 22:30:55.597779+00	
00000000-0000-0000-0000-000000000000	8c9aff26-d4c9-4e8c-8aa1-c8b8f92cefe4	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 22:30:55.600705+00	
00000000-0000-0000-0000-000000000000	df5b5c25-5949-48f1-a53c-b306089cb8df	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-08 22:32:41.413646+00	
00000000-0000-0000-0000-000000000000	a6656c36-f6e9-4e07-9721-e7711cf9dcf4	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-08 22:32:41.415211+00	
00000000-0000-0000-0000-000000000000	3f8fd13c-0fad-41c6-b9c4-2b2375bc64e0	{"action":"token_refreshed","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 22:53:58.478255+00	
00000000-0000-0000-0000-000000000000	4f02c5c7-48bd-48c7-8376-bc50e5ec59a9	{"action":"token_revoked","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 22:53:58.484281+00	
00000000-0000-0000-0000-000000000000	b84de450-dda9-4489-83f7-bc4dd267ebfa	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 23:34:46.139458+00	
00000000-0000-0000-0000-000000000000	da9314d1-0d37-4c2f-b461-c6eac649d096	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-08 23:34:46.142449+00	
00000000-0000-0000-0000-000000000000	9ffd0476-14d0-4ca3-aa2d-18d779b03444	{"action":"token_refreshed","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 01:33:28.456501+00	
00000000-0000-0000-0000-000000000000	bf5efe26-eeb3-4951-b902-f39eec9700d6	{"action":"token_revoked","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 01:33:28.459676+00	
00000000-0000-0000-0000-000000000000	03a117dc-3397-4bd3-9c03-0a0a1c150c01	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 01:45:09.602523+00	
00000000-0000-0000-0000-000000000000	31b4d702-7c7d-4a58-ac01-d944ed817297	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 01:45:09.604711+00	
00000000-0000-0000-0000-000000000000	8e2db51d-b6df-4338-b009-195f4f32a49a	{"action":"token_refreshed","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 02:31:54.25595+00	
00000000-0000-0000-0000-000000000000	fc309514-5196-4c62-a4da-569512f24999	{"action":"token_revoked","actor_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","actor_username":"zy2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 02:31:54.258721+00	
00000000-0000-0000-0000-000000000000	aedce1b4-de22-40ea-86bc-5d99f9876047	{"action":"user_signedup","actor_id":"2ccb7762-72c7-4aeb-93ab-5b628ea330f3","actor_username":"test01@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-09 02:40:56.563598+00	
00000000-0000-0000-0000-000000000000	48ef08b9-9ae3-43cd-83b9-4045d2d94078	{"action":"login","actor_id":"2ccb7762-72c7-4aeb-93ab-5b628ea330f3","actor_username":"test01@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-09 02:40:56.569985+00	
00000000-0000-0000-0000-000000000000	8c6bb3f8-3f28-467e-9cde-8e3619118ffe	{"action":"user_signedup","actor_id":"b314f0e1-5f44-48a5-9a99-30387795843c","actor_username":"test02@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-09 02:41:41.991771+00	
00000000-0000-0000-0000-000000000000	21db940b-7a12-4ce9-9e2b-0a9de8024222	{"action":"login","actor_id":"b314f0e1-5f44-48a5-9a99-30387795843c","actor_username":"test02@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-09 02:41:41.995285+00	
00000000-0000-0000-0000-000000000000	3c0957de-c2f9-4779-a514-6a86d0cd847f	{"action":"user_signedup","actor_id":"44339363-8791-433b-93d4-93642c90c69a","actor_username":"test03@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-09 02:43:16.95798+00	
00000000-0000-0000-0000-000000000000	b9059a40-b3dd-448b-b1b6-a2535a5b44db	{"action":"login","actor_id":"44339363-8791-433b-93d4-93642c90c69a","actor_username":"test03@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-09 02:43:16.96259+00	
00000000-0000-0000-0000-000000000000	f00cf821-3114-44df-9fa0-bde4b077ca78	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 02:45:07.627578+00	
00000000-0000-0000-0000-000000000000	7345efc7-3c0f-4f94-9186-311aa59dd742	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 02:45:07.630045+00	
00000000-0000-0000-0000-000000000000	f3b68111-442d-46de-b56a-96fa41ea7b71	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 04:33:52.41789+00	
00000000-0000-0000-0000-000000000000	b9375989-8e5c-4ae6-ba4b-5efa3ff1b658	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 04:33:52.428215+00	
00000000-0000-0000-0000-000000000000	ee6f937d-d7fd-480e-8fc4-49b9e7038c8b	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 05:41:25.824331+00	
00000000-0000-0000-0000-000000000000	d75a15a2-4a8d-45d0-a816-a9f44ff4c195	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 05:41:25.830723+00	
00000000-0000-0000-0000-000000000000	ca9ff6f6-56cb-4476-bf09-2791178b384e	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 06:39:49.054641+00	
00000000-0000-0000-0000-000000000000	f6a94786-b6a6-4935-8f93-b556a1c056ad	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 06:39:49.058798+00	
00000000-0000-0000-0000-000000000000	1c372923-9056-4c77-b73d-3af95d4317f5	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 07:38:19.570775+00	
00000000-0000-0000-0000-000000000000	c9bdcd4d-0bf4-4861-b15b-bd9f245b3353	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 07:38:19.578251+00	
00000000-0000-0000-0000-000000000000	bb0c7dc8-6726-4762-927d-9b01b93e3fb4	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 09:23:16.090199+00	
00000000-0000-0000-0000-000000000000	4a4ae423-e981-4cd0-90fa-c589194dcc2e	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 09:23:16.097811+00	
00000000-0000-0000-0000-000000000000	2dc9d72c-caa5-4209-8cd8-e6b41894f035	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 17:49:52.200319+00	
00000000-0000-0000-0000-000000000000	376e0b07-8a54-4625-8878-7034b1c883fd	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-09 17:49:52.211708+00	
00000000-0000-0000-0000-000000000000	efb319bd-7e7a-48c2-ad3f-56986af746f1	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 01:20:04.173056+00	
00000000-0000-0000-0000-000000000000	24af74a4-e300-4ec7-9854-b5108bd356ff	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 01:20:04.185038+00	
00000000-0000-0000-0000-000000000000	f9a9c2e9-1d7c-4e76-9520-6b3f4c93637d	{"action":"login","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 01:20:04.570805+00	
00000000-0000-0000-0000-000000000000	92e5c9d3-3ee4-47b3-a765-2aa97c727968	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 02:12:14.906573+00	
00000000-0000-0000-0000-000000000000	9cac7ad1-5844-44fb-86d8-78ed65e5f5f3	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 02:12:14.914733+00	
00000000-0000-0000-0000-000000000000	54409b12-1f77-4b7f-8d36-13d360121bde	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 03:11:38.139907+00	
00000000-0000-0000-0000-000000000000	97171343-67d9-4d19-ae74-d683cbe6def9	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 03:11:38.146248+00	
00000000-0000-0000-0000-000000000000	b18737a8-67e2-4680-ade5-ad1c3168397a	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 03:25:19.050475+00	
00000000-0000-0000-0000-000000000000	bd27d93e-0753-44ad-ae5c-267fbe0ea306	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 03:25:19.052136+00	
00000000-0000-0000-0000-000000000000	0d84b522-eae4-4a13-895c-f5e27b6df511	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 04:09:41.334193+00	
00000000-0000-0000-0000-000000000000	39d3ef09-4a5d-4d68-99f1-9acb4024de4f	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 04:09:41.337491+00	
00000000-0000-0000-0000-000000000000	604b8b4b-3b2e-4f1e-afe5-bff47e3103a4	{"action":"token_refreshed","actor_id":"44339363-8791-433b-93d4-93642c90c69a","actor_username":"test03@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 04:17:48.470838+00	
00000000-0000-0000-0000-000000000000	03c4db78-d28d-4a59-a961-9721ba475141	{"action":"token_revoked","actor_id":"44339363-8791-433b-93d4-93642c90c69a","actor_username":"test03@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 04:17:48.47286+00	
00000000-0000-0000-0000-000000000000	6b369857-b6a0-4aa6-810b-2cb098c4d733	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 04:19:54.010058+00	
00000000-0000-0000-0000-000000000000	23b86b68-fd3c-4595-89cf-37fff4d3e01a	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 04:23:56.489969+00	
00000000-0000-0000-0000-000000000000	3ba7d454-394b-418c-9f0f-b9d29a161224	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 04:23:56.4936+00	
00000000-0000-0000-0000-000000000000	a175f718-428b-4657-a35f-f631c569f74c	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 05:20:29.336454+00	
00000000-0000-0000-0000-000000000000	97a69cf0-df17-4f2e-b2bb-e37f8611e1cf	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 05:20:29.339197+00	
00000000-0000-0000-0000-000000000000	e59c94f9-0d05-4d40-89ba-e5f4f312ff10	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 05:20:40.376621+00	
00000000-0000-0000-0000-000000000000	59b75388-d5e6-4129-a143-b1155fefd771	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 05:20:40.377433+00	
00000000-0000-0000-0000-000000000000	5e0b9009-cc0c-47cd-81be-046e4d89c81f	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 05:24:45.734047+00	
00000000-0000-0000-0000-000000000000	b83230fd-9c96-4eee-b356-61c88f431194	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 05:24:45.734975+00	
00000000-0000-0000-0000-000000000000	89eea704-b644-4a5f-84f6-0d6a362f10e7	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 06:18:44.784368+00	
00000000-0000-0000-0000-000000000000	e5e69bc6-9f54-4e38-9e9b-9f1a2b355718	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 06:18:44.787869+00	
00000000-0000-0000-0000-000000000000	9138fa5f-831b-467d-a1c8-c25066a53fc3	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 06:23:19.906607+00	
00000000-0000-0000-0000-000000000000	1498d8d1-ca8f-484c-91fb-f6d583f3ae3c	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 06:23:19.907597+00	
00000000-0000-0000-0000-000000000000	4192f48c-527e-42f3-bc43-e7af6645356e	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 06:29:28.905434+00	
00000000-0000-0000-0000-000000000000	574b88ea-bf12-4332-9aba-2b19b78d840d	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 06:29:28.908704+00	
00000000-0000-0000-0000-000000000000	d7c34919-6c82-4d26-9904-8c3c3d07e61c	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 07:29:14.494692+00	
00000000-0000-0000-0000-000000000000	ef944b57-02f8-42ac-b968-baa91734a40f	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 07:29:14.50541+00	
00000000-0000-0000-0000-000000000000	270b4a91-6a58-4e22-aa5c-70eb2aae1229	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 07:33:57.18653+00	
00000000-0000-0000-0000-000000000000	b3556a8d-d61a-4f7c-8781-a8aa4e815c02	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 07:33:57.190682+00	
00000000-0000-0000-0000-000000000000	7c30dd1e-a590-4114-9764-9e512c26abe6	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 08:27:17.964124+00	
00000000-0000-0000-0000-000000000000	3a3627e1-b8be-4d6c-b839-2aae9f7e5735	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 08:27:17.967111+00	
00000000-0000-0000-0000-000000000000	eb039459-4484-4868-8b67-f63f96297892	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 08:32:12.7802+00	
00000000-0000-0000-0000-000000000000	a201bb42-87b7-4bcf-a5ab-66a2c08f0deb	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 08:32:12.78387+00	
00000000-0000-0000-0000-000000000000	b350b1cf-1abd-4985-87d3-77828f754ee6	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 09:25:36.883787+00	
00000000-0000-0000-0000-000000000000	130fa18a-7b77-4c87-b0e7-f31ef0c7cff6	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 09:25:36.89138+00	
00000000-0000-0000-0000-000000000000	d47968c6-fe0d-4ab6-a1ae-cdf22aeb24d3	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 09:30:41.571711+00	
00000000-0000-0000-0000-000000000000	eda87248-86fe-4ff7-b26c-d21d547072d8	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 09:30:41.575504+00	
00000000-0000-0000-0000-000000000000	75052d7f-b780-427b-a34c-ddf237fd4cc2	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 10:29:27.285052+00	
00000000-0000-0000-0000-000000000000	0963d66f-c79c-423e-b791-3a290ef80413	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 10:29:27.292067+00	
00000000-0000-0000-0000-000000000000	0c9f753a-bae8-4a1a-b56e-667cb4bcb962	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 17:41:28.296028+00	
00000000-0000-0000-0000-000000000000	62481d80-bcd3-44cc-95c5-5c26bd98bf09	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 17:41:28.30558+00	
00000000-0000-0000-0000-000000000000	4f1abac3-fd9c-42b4-9efe-fbb7bf132fdd	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:10:23.289095+00	
00000000-0000-0000-0000-000000000000	f2f6bc29-e40c-4d55-a739-cbe9cee7edfb	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:10:23.298947+00	
00000000-0000-0000-0000-000000000000	01a0b5d8-2022-495e-924b-386c245bb9ef	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:26:27.320896+00	
00000000-0000-0000-0000-000000000000	491a5b5e-4fb3-4a09-82f9-c4cca78cb64b	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:26:27.324444+00	
00000000-0000-0000-0000-000000000000	7a2f75ae-f287-4359-b2e7-d4e87774bc82	{"action":"user_signedup","actor_id":"66297fcd-b66d-4deb-ad5b-f24ba1dfd26a","actor_username":"delivery@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-10 19:30:06.79016+00	
00000000-0000-0000-0000-000000000000	7c3565a9-8b4b-486a-bb98-a272173061b5	{"action":"login","actor_id":"66297fcd-b66d-4deb-ad5b-f24ba1dfd26a","actor_username":"delivery@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 19:30:06.797276+00	
00000000-0000-0000-0000-000000000000	d5c13ab2-1bab-412a-9fbe-f8809b4fa381	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:32:53.024058+00	
00000000-0000-0000-0000-000000000000	5e1ae925-bbb0-49d7-9a85-1ce158010487	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:32:53.028266+00	
00000000-0000-0000-0000-000000000000	6d5eb191-5774-410d-af3f-dec809229cd4	{"action":"user_signedup","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-10 19:35:38.513069+00	
00000000-0000-0000-0000-000000000000	e8371e03-69a6-4359-aecc-15c8abf34f83	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 19:35:38.518523+00	
00000000-0000-0000-0000-000000000000	87c68037-9d71-4788-844d-b3ad72e8fe4c	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:39:44.923636+00	
00000000-0000-0000-0000-000000000000	b616b42e-07b6-44e6-8083-78ed3ba33258	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:39:44.924557+00	
00000000-0000-0000-0000-000000000000	832e948f-d8e9-407c-abed-56c8ee82fc2f	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 19:39:48.667098+00	
00000000-0000-0000-0000-000000000000	1b474f1a-a21a-4739-a268-8bfd5d360924	{"action":"user_signedup","actor_id":"53080ade-33ee-4342-ae5e-9683f4368b6a","actor_username":"peoplelead@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-10 19:43:55.529566+00	
00000000-0000-0000-0000-000000000000	0507fae4-9722-4bac-a90d-ac7549094946	{"action":"login","actor_id":"53080ade-33ee-4342-ae5e-9683f4368b6a","actor_username":"peoplelead@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 19:43:55.537846+00	
00000000-0000-0000-0000-000000000000	faa2c4b5-ccac-4f07-a418-076587e25687	{"action":"user_signedup","actor_id":"0475f20b-25ce-485e-95cc-bd729859637d","actor_username":"talent@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-10 19:44:53.872328+00	
00000000-0000-0000-0000-000000000000	21d2f6fa-f2e4-454d-a969-f8d975c150df	{"action":"login","actor_id":"0475f20b-25ce-485e-95cc-bd729859637d","actor_username":"talent@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 19:44:53.877391+00	
00000000-0000-0000-0000-000000000000	fcbab6ea-c3d3-40fc-9b70-b69e920576b1	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:45:03.356656+00	
00000000-0000-0000-0000-000000000000	3cc6830b-bd5b-4c6e-955e-19c8d755b6bc	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 19:45:03.357979+00	
00000000-0000-0000-0000-000000000000	d49c20c5-d69a-4750-b5ff-34b89f65a72f	{"action":"login","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 19:45:03.962098+00	
00000000-0000-0000-0000-000000000000	d669b5da-4736-41c9-a0de-a2e67b8e38ab	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 19:54:09.012646+00	
00000000-0000-0000-0000-000000000000	169aaa11-c2b6-438a-a104-38d055f6163c	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 19:54:09.204627+00	
00000000-0000-0000-0000-000000000000	274ee352-ffd4-4724-968d-3b0df25342f4	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 19:54:10.936869+00	
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
00000000-0000-0000-0000-000000000000	9950b2e9-632f-42ff-b259-726ede4e408f	authenticated	authenticated	emirpuente31@gmail.com	$2a$10$0ZK6OsdkRn0vP77iccMbLu9LJXM8hD/nrIv6szdiU2tY9uyaUTvp6	2025-04-04 21:08:41.014941+00	\N		\N		\N			\N	2025-04-10 19:45:03.962841+00	{"provider": "email", "providers": ["email"]}	{"sub": "9950b2e9-632f-42ff-b259-726ede4e408f", "name": "Emir ", "role": "employee", "email": "emirpuente31@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 21:08:40.986911+00	2025-04-10 19:45:03.965451+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	authenticated	authenticated	davidminirey04@gmail.com	$2a$10$TeZT5rMlteYWsjreun8va.hwqfF9kEzqnIMUXPDmQLhMnDfzbnfbO	2025-04-04 21:09:21.551978+00	\N		\N		\N			\N	2025-04-04 21:09:21.55618+00	{"provider": "email", "providers": ["email"]}	{"sub": "17be3a68-8d97-4557-85e8-8e8cc9ecbc13", "name": "david", "role": "employee", "email": "davidminirey04@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 21:09:21.542561+00	2025-04-07 21:09:08.957296+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	dee4835c-764c-40fb-bf0b-3bff8a0457d4	authenticated	authenticated	naranjilandia2004@gmail.com	$2a$10$Tik8uk7nAlAadCnW1g/hzeYq8EvKZyGt1vFjR7lN.kMbfrVMDogam	2025-04-04 22:40:28.570105+00	\N		\N		\N			\N	2025-04-04 22:42:21.387227+00	{"provider": "email", "providers": ["email"]}	{"sub": "dee4835c-764c-40fb-bf0b-3bff8a0457d4", "name": "Pancho Naranjas", "role": "employee", "email": "naranjilandia2004@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 22:40:28.547229+00	2025-04-04 22:42:21.389543+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c3886a9b-c360-4fec-b16d-058747789ee2	authenticated	authenticated	xnhs@gmail.com	$2a$10$/QtdK4HWS1q5ro4jAQfl1.yHOM/Pa9N6qisvygjDmibfsWZ8bJ2fW	2025-04-04 23:16:23.82409+00	\N		\N		\N			\N	2025-04-04 23:16:23.828387+00	{"provider": "email", "providers": ["email"]}	{"sub": "c3886a9b-c360-4fec-b16d-058747789ee2", "name": "aksc", "role": "employee", "email": "xnhs@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 23:16:23.810339+00	2025-04-04 23:16:23.83311+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9d6ddaee-5f7c-4cef-8705-6db6a8d11109	authenticated	authenticated	yi@gmail.com	$2a$10$YejIlid.nPj3l92KfHe3yOC6SPGbgX1uj3HJ4TsPFexbIIwLiCy/a	2025-04-04 23:08:43.133554+00	\N		\N		\N			\N	2025-04-04 23:08:43.138398+00	{"provider": "email", "providers": ["email"]}	{"sub": "9d6ddaee-5f7c-4cef-8705-6db6a8d11109", "name": "yi", "role": "employee", "email": "yi@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 23:08:43.123322+00	2025-04-04 23:08:43.144236+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	564b41de-e4a1-4e56-bff7-c0681abc0718	authenticated	authenticated	a01198676@tec.mx	$2a$10$OWdlCJDTVT2YUv65UgEuIubEYL9cPUJ.vq.1hmBC8poIp/M3Jh4wq	2025-04-04 00:05:14.081829+00	\N		\N		\N			\N	2025-04-04 08:37:41.63076+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-04-04 00:05:14.078028+00	2025-04-10 19:10:23.31065+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7478c90f-4de7-494d-ae79-fc28756dc4ab	authenticated	authenticated	a01741300@tec.mx	$2a$10$owQpDbpAjPcrHR7s7B0MWOlIDVtRxarymDgdjSh7gohAN3B6cm8GO	2025-04-03 07:26:01.05692+00	\N		\N		\N			\N	2025-04-10 04:19:54.011182+00	{"provider": "email", "providers": ["email"]}	{"sub": "7478c90f-4de7-494d-ae79-fc28756dc4ab", "name": "rick", "role": "employee", "email": "a01741300@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-03 07:26:01.049841+00	2025-04-10 19:26:27.331117+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ff98b050-236d-4a28-8aea-567f03b9f3c3	authenticated	authenticated	rantonion2004@outlook.com	$2a$10$z/JTayFCOsYP7u9ubuQL9u6BdJ0xo3xZ6ndfh0/PsoLfeKx7kGUQC	2025-04-04 22:56:53.287928+00	\N		\N		\N			\N	2025-04-07 21:46:59.963427+00	{"provider": "email", "providers": ["email"]}	{"sub": "ff98b050-236d-4a28-8aea-567f03b9f3c3", "name": "Ramón Antonio Naranjo Sarmiento", "role": "employee", "email": "rantonion2004@outlook.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 22:56:53.278128+00	2025-04-10 19:32:53.034983+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7dfad126-2905-431a-829b-fcae851fe102	authenticated	authenticated	a01722728@tec.mx	$2a$10$fHgy1ulquoZVKjgjGIMgEuPLZytPHDv0KCKtQ0FPmYxwVgtSvPvlm	2025-04-07 21:40:35.123375+00	\N		\N		\N			\N	2025-04-10 19:54:10.93759+00	{"provider": "email", "providers": ["email"]}	{"sub": "7dfad126-2905-431a-829b-fcae851fe102", "name": "David", "role": "employee", "email": "a01722728@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-07 21:40:35.104179+00	2025-04-10 19:54:10.939971+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	577146a4-87b1-4f34-9bb1-824140ff4c54	authenticated	authenticated	zi@tec.mx	$2a$10$T.Vwj8wKOoimej1UQLg4peVLYZZVx6Lj3Hy1RNm2ccs.12V7ofmqS	2025-04-08 20:27:24.912747+00	\N		\N		\N			\N	2025-04-08 20:27:24.919282+00	{"provider": "email", "providers": ["email"]}	{"sub": "577146a4-87b1-4f34-9bb1-824140ff4c54", "name": "zi", "role": "employee", "email": "zi@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-08 20:27:24.875947+00	2025-04-08 20:27:24.925298+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	31fbe58a-c798-401a-b2aa-c06726293956	authenticated	authenticated	test@t.com	$2a$10$K9kHR.xxhkhjaWhQZ/jZ2eLyluSQN/sA3Bs.yimUgo3ehfCtEMbju	2025-04-07 23:30:10.217825+00	\N		\N		\N			\N	2025-04-07 23:30:10.221985+00	{"provider": "email", "providers": ["email"]}	{"sub": "31fbe58a-c798-401a-b2aa-c06726293956", "name": "test", "role": "employee", "email": "test@t.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:30:10.209378+00	2025-04-07 23:30:10.226874+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	a57aab4d-0c82-479b-91cd-2502a0c7dac8	authenticated	authenticated	axd1@gmail.com	$2a$10$0m96m3gIrJdjR5oWHWKAdOfF86LHrBWkQO7eLl9JVd3PJjbEYtsTy	2025-04-07 20:53:47.198258+00	\N		\N		\N			\N	2025-04-07 20:53:47.202909+00	{"provider": "email", "providers": ["email"]}	{"sub": "a57aab4d-0c82-479b-91cd-2502a0c7dac8", "name": "Sergio  r", "role": "employee", "email": "axd1@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 20:53:47.189776+00	2025-04-07 20:53:47.205373+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	6eb32f88-231e-4237-9f93-6689a94b624d	authenticated	authenticated	amn@gmail.com	$2a$10$Ckh27Orq6sogU.2AQM3o7.IJZru68Y/P/AH/icKDxEs7PT4WKty/6	2025-04-07 23:22:47.101193+00	\N		\N		\N			\N	2025-04-07 23:22:47.108577+00	{"provider": "email", "providers": ["email"]}	{"sub": "6eb32f88-231e-4237-9f93-6689a94b624d", "name": "sd", "role": "employee", "email": "amn@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:22:47.085246+00	2025-04-07 23:22:47.112571+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0a38c26c-3a86-42cb-b39b-c9c76848f0e5	authenticated	authenticated	oi@c.c	$2a$10$gBe6PQx7pfexOW/.npKhcu4gMLAuoOo37SKkClZgMGQy1IV2aJI0O	2025-04-08 00:26:00.016798+00	\N		\N		\N			\N	2025-04-08 00:26:00.023484+00	{"provider": "email", "providers": ["email"]}	{"sub": "0a38c26c-3a86-42cb-b39b-c9c76848f0e5", "name": "oij", "role": "employee", "email": "oi@c.c", "email_verified": true, "phone_verified": false}	\N	2025-04-08 00:25:59.991985+00	2025-04-08 20:24:54.287375+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	204b4114-7454-40dd-afd4-d4521f0c2558	authenticated	authenticated	a3@cd.mx	$2a$10$A8yKVGB5EztGHSfFyvU7nuL1fy4EUitOJf.8Zt.zSGg7TMbYSRn0m	2025-04-08 00:06:55.661071+00	\N		\N		\N			\N	2025-04-08 00:06:55.667609+00	{"provider": "email", "providers": ["email"]}	{"sub": "204b4114-7454-40dd-afd4-d4521f0c2558", "name": "a3", "role": "employee", "email": "a3@cd.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-08 00:06:55.64608+00	2025-04-08 00:06:55.677373+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	a004e928-2b22-4749-ad53-9232297705be	authenticated	authenticated	axsax@gmail.com	$2a$10$ppQPCy/f.BK6QtUHzgPCZ.yLLgZ.ayp68L6BICCX5bRELEJWkGfg2	2025-04-07 23:37:10.565014+00	\N		\N		\N			\N	2025-04-07 23:37:10.570188+00	{"provider": "email", "providers": ["email"]}	{"sub": "a004e928-2b22-4749-ad53-9232297705be", "name": "kns", "role": "employee", "email": "axsax@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:37:10.557368+00	2025-04-07 23:37:10.575596+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	37a795b1-0a19-41ca-a09c-805dc258ac38	authenticated	authenticated	sd@tec.mx	$2a$10$VhzjX9w/e1RM3HuoRnEOb.RlJkgeZZYfagbdno3m931UQxzBa3gCC	2025-04-08 00:16:29.322539+00	\N		\N		\N			\N	2025-04-08 00:16:29.328981+00	{"provider": "email", "providers": ["email"]}	{"sub": "37a795b1-0a19-41ca-a09c-805dc258ac38", "name": "jbhds", "role": "employee", "email": "sd@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-08 00:16:29.307114+00	2025-04-08 00:16:29.338225+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	2eadd525-41bd-4c5d-9073-faf9c6b91714	authenticated	authenticated	auch@gmail.com	$2a$10$hZU71NZ3Czh/GpcDBlfGk.SUpJBamfsFjU1i05QQcQxaLMBDe7CFe	2025-04-07 23:24:17.053171+00	\N		\N		\N			\N	2025-04-07 23:24:17.057432+00	{"provider": "email", "providers": ["email"]}	{"sub": "2eadd525-41bd-4c5d-9073-faf9c6b91714", "name": "Auch", "role": "employee", "email": "auch@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:24:17.045429+00	2025-04-07 23:24:17.059855+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	392c88d5-a2c3-4a14-88d1-2d84bc8133c5	authenticated	authenticated	ajd@tec.mx	$2a$10$nt8IRM0eVP9nZ7BrYl8are0/nOqfNT0UtHIRjs8VL/kemGHjunajy	2025-04-08 00:08:41.298335+00	\N		\N		\N			\N	2025-04-08 00:08:41.302472+00	{"provider": "email", "providers": ["email"]}	{"sub": "392c88d5-a2c3-4a14-88d1-2d84bc8133c5", "name": "sjd", "role": "employee", "email": "ajd@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-08 00:08:41.290542+00	2025-04-08 00:08:41.306249+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0e41703f-9367-446f-ab66-0c5477edda65	authenticated	authenticated	abssh@g.com	$2a$10$RqixGH6i3R3vUY7Q0fEBj.TJC4/YUdLfToH.eeFmTWleNlGxUthLC	2025-04-07 23:34:08.078617+00	\N		\N		\N			\N	2025-04-07 23:34:08.082505+00	{"provider": "email", "providers": ["email"]}	{"sub": "0e41703f-9367-446f-ab66-0c5477edda65", "name": "ajsn", "role": "employee", "email": "abssh@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-07 23:34:08.071059+00	2025-04-07 23:34:08.085205+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	a0a40b5c-c8be-40f1-ae42-d8bb32677c8e	authenticated	authenticated	kjsnd@h.co	$2a$10$T8j/eld/iQWHgkiH/y.LbO5PEeoEEs8fVpO2HtNsvWn/TiHtvYf7C	2025-04-08 00:23:45.392383+00	\N		\N		\N			\N	2025-04-08 00:23:45.397213+00	{"provider": "email", "providers": ["email"]}	{"sub": "a0a40b5c-c8be-40f1-ae42-d8bb32677c8e", "name": "1", "role": "employee", "email": "kjsnd@h.co", "email_verified": true, "phone_verified": false}	\N	2025-04-08 00:23:45.377813+00	2025-04-08 00:23:45.401747+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	809bf7bd-14ec-4553-9e37-90a697149799	authenticated	authenticated	zic@tec.mx	$2a$10$669kD/sZZh6ZOsKLtABR7ec9DZ4r0Y8wxw1rYNGlbiyr.36Qc.Vd2	2025-04-08 20:27:54.467447+00	\N		\N		\N			\N	2025-04-08 20:27:54.472766+00	{"provider": "email", "providers": ["email"]}	{"sub": "809bf7bd-14ec-4553-9e37-90a697149799", "name": "zi", "role": "employee", "email": "zic@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-08 20:27:54.458318+00	2025-04-08 20:27:54.474565+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	authenticated	authenticated	delivery@g.com	$2a$10$ZQExPCjntaAHrWQ4tnYbguGtU0fxHUajU847mD.SkcEoLgPdo0TjG	2025-04-10 19:30:06.790883+00	\N		\N		\N			\N	2025-04-10 19:30:06.797833+00	{"provider": "email", "providers": ["email"]}	{"sub": "66297fcd-b66d-4deb-ad5b-f24ba1dfd26a", "name": "Delivery", "role": "employee", "email": "delivery@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-10 19:30:06.757139+00	2025-04-10 19:30:06.807559+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	2ccb7762-72c7-4aeb-93ab-5b628ea330f3	authenticated	authenticated	test01@g.com	$2a$10$11wqBaqD0eOkmx0nj4aNw.9yEcz.iQhYeq2CF10tnIBPvf1loFcfS	2025-04-09 02:40:56.565061+00	\N		\N		\N			\N	2025-04-09 02:40:56.570623+00	{"provider": "email", "providers": ["email"]}	{"sub": "2ccb7762-72c7-4aeb-93ab-5b628ea330f3", "name": "wd", "role": "employee", "email": "test01@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-09 02:40:56.539389+00	2025-04-09 02:40:56.580081+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	44339363-8791-433b-93d4-93642c90c69a	authenticated	authenticated	test03@g.com	$2a$10$yr7SeUi8xCyKVIwU2xZl3ulsEMAyeXDbMJ5.PWMM6xrdTtKtyTuUa	2025-04-09 02:43:16.958842+00	\N		\N		\N			\N	2025-04-09 02:43:16.963144+00	{"provider": "email", "providers": ["email"]}	{"sub": "44339363-8791-433b-93d4-93642c90c69a", "name": "Test03", "role": "employee", "email": "test03@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-09 02:43:16.947668+00	2025-04-10 04:17:48.47796+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	b314f0e1-5f44-48a5-9a99-30387795843c	authenticated	authenticated	test02@g.com	$2a$10$l6p6QKW7IMOsoV5oRdPGc.DBfPgldJ4qc/27GsVCQc/qJIX.KHeNO	2025-04-09 02:41:41.992356+00	\N		\N		\N			\N	2025-04-09 02:41:41.995967+00	{"provider": "email", "providers": ["email"]}	{"sub": "b314f0e1-5f44-48a5-9a99-30387795843c", "name": "wd", "role": "employee", "email": "test02@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-09 02:41:41.983233+00	2025-04-09 02:41:41.997708+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9cdc8f90-0c14-4d94-bfba-45c371b30735	authenticated	authenticated	zy2@gmail.com	$2a$10$YQmpgGwlzy8qi2u6ZmK6/eSDQJ3CcloWFQaUCOn8aKyRSHImvkEbS	2025-04-08 20:32:52.796246+00	\N		\N		\N			\N	2025-04-08 20:32:52.800996+00	{"provider": "email", "providers": ["email"]}	{"sub": "9cdc8f90-0c14-4d94-bfba-45c371b30735", "name": "zy2", "role": "employee", "email": "zy2@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-08 20:32:52.780624+00	2025-04-09 02:31:54.262983+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	53080ade-33ee-4342-ae5e-9683f4368b6a	authenticated	authenticated	peoplelead@g.com	$2a$10$aW/r71TqAgi2l852Esf9NOBpuL6.J0y4gpCQ/ttlLXdEL2GT2k3SK	2025-04-10 19:43:55.533727+00	\N		\N		\N			\N	2025-04-10 19:43:55.538407+00	{"provider": "email", "providers": ["email"]}	{"sub": "53080ade-33ee-4342-ae5e-9683f4368b6a", "name": "people lead", "role": "employee", "email": "peoplelead@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-10 19:43:55.518123+00	2025-04-10 19:43:55.545164+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	412b6cda-4dbd-4bec-832e-1509eaf56414	authenticated	authenticated	capability@g.com	$2a$10$LaxMsWYl1EGCiOZG.vK.TOvTh7YbAkny4JO/BFBeiHD/hlpD3e1HO	2025-04-10 19:35:38.51439+00	\N		\N		\N			\N	2025-04-10 19:35:38.519841+00	{"provider": "email", "providers": ["email"]}	{"sub": "412b6cda-4dbd-4bec-832e-1509eaf56414", "name": "Capability", "role": "employee", "email": "capability@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-10 19:35:38.501687+00	2025-04-10 19:35:38.526888+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0475f20b-25ce-485e-95cc-bd729859637d	authenticated	authenticated	talent@g.com	$2a$10$nKKUJry3UuKdlqJA43TdwOxSlp7cKft/yNyKBArA/OE0jMBTf.Rgy	2025-04-10 19:44:53.873404+00	\N		\N		\N			\N	2025-04-10 19:44:53.877978+00	{"provider": "email", "providers": ["email"]}	{"sub": "0475f20b-25ce-485e-95cc-bd729859637d", "name": "Talent lead", "role": "employee", "email": "talent@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-10 19:44:53.86637+00	2025-04-10 19:44:53.88225+00	\N	\N			\N		0	\N		\N	f	\N	f
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
204b4114-7454-40dd-afd4-d4521f0c2558	204b4114-7454-40dd-afd4-d4521f0c2558	{"sub": "204b4114-7454-40dd-afd4-d4521f0c2558", "name": "a3", "role": "employee", "email": "a3@cd.mx", "email_verified": false, "phone_verified": false}	email	2025-04-08 00:06:55.651979+00	2025-04-08 00:06:55.652026+00	2025-04-08 00:06:55.652026+00	fccb77f2-fe59-4982-9482-a3c2be675199
392c88d5-a2c3-4a14-88d1-2d84bc8133c5	392c88d5-a2c3-4a14-88d1-2d84bc8133c5	{"sub": "392c88d5-a2c3-4a14-88d1-2d84bc8133c5", "name": "sjd", "role": "employee", "email": "ajd@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-08 00:08:41.294168+00	2025-04-08 00:08:41.29422+00	2025-04-08 00:08:41.29422+00	437b2f03-936a-49f0-8ded-4e5b3f718584
37a795b1-0a19-41ca-a09c-805dc258ac38	37a795b1-0a19-41ca-a09c-805dc258ac38	{"sub": "37a795b1-0a19-41ca-a09c-805dc258ac38", "name": "jbhds", "role": "employee", "email": "sd@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-08 00:16:29.314847+00	2025-04-08 00:16:29.314895+00	2025-04-08 00:16:29.314895+00	c60ae0a7-573e-4272-a57e-5ad6950192f7
a0a40b5c-c8be-40f1-ae42-d8bb32677c8e	a0a40b5c-c8be-40f1-ae42-d8bb32677c8e	{"sub": "a0a40b5c-c8be-40f1-ae42-d8bb32677c8e", "name": "1", "role": "employee", "email": "kjsnd@h.co", "email_verified": false, "phone_verified": false}	email	2025-04-08 00:23:45.385277+00	2025-04-08 00:23:45.385326+00	2025-04-08 00:23:45.385326+00	d4b41e05-4979-4682-83d8-4d522f0b7ae1
0a38c26c-3a86-42cb-b39b-c9c76848f0e5	0a38c26c-3a86-42cb-b39b-c9c76848f0e5	{"sub": "0a38c26c-3a86-42cb-b39b-c9c76848f0e5", "name": "oij", "role": "employee", "email": "oi@c.c", "email_verified": false, "phone_verified": false}	email	2025-04-08 00:25:59.998575+00	2025-04-08 00:25:59.998638+00	2025-04-08 00:25:59.998638+00	a655cf24-eb88-4a0e-b30f-d1a3b0138f31
577146a4-87b1-4f34-9bb1-824140ff4c54	577146a4-87b1-4f34-9bb1-824140ff4c54	{"sub": "577146a4-87b1-4f34-9bb1-824140ff4c54", "name": "zi", "role": "employee", "email": "zi@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-08 20:27:24.900117+00	2025-04-08 20:27:24.900209+00	2025-04-08 20:27:24.900209+00	a60e2a17-0bf9-42c6-92da-ecc32f0bc361
809bf7bd-14ec-4553-9e37-90a697149799	809bf7bd-14ec-4553-9e37-90a697149799	{"sub": "809bf7bd-14ec-4553-9e37-90a697149799", "name": "zi", "role": "employee", "email": "zic@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-08 20:27:54.460575+00	2025-04-08 20:27:54.464064+00	2025-04-08 20:27:54.464064+00	2357ec41-a789-472f-bd63-d2bf307d31de
9cdc8f90-0c14-4d94-bfba-45c371b30735	9cdc8f90-0c14-4d94-bfba-45c371b30735	{"sub": "9cdc8f90-0c14-4d94-bfba-45c371b30735", "name": "zy2", "role": "employee", "email": "zy2@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-04-08 20:32:52.787712+00	2025-04-08 20:32:52.787763+00	2025-04-08 20:32:52.787763+00	15428ab0-ba71-4808-99f8-740bacfe8500
2ccb7762-72c7-4aeb-93ab-5b628ea330f3	2ccb7762-72c7-4aeb-93ab-5b628ea330f3	{"sub": "2ccb7762-72c7-4aeb-93ab-5b628ea330f3", "name": "wd", "role": "employee", "email": "test01@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-09 02:40:56.557866+00	2025-04-09 02:40:56.557934+00	2025-04-09 02:40:56.557934+00	73754e60-3ea5-40b7-b0f5-c1beecc56740
b314f0e1-5f44-48a5-9a99-30387795843c	b314f0e1-5f44-48a5-9a99-30387795843c	{"sub": "b314f0e1-5f44-48a5-9a99-30387795843c", "name": "wd", "role": "employee", "email": "test02@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-09 02:41:41.985454+00	2025-04-09 02:41:41.985501+00	2025-04-09 02:41:41.985501+00	e34cc7e9-aaf8-47cc-8d2d-d14c53052811
44339363-8791-433b-93d4-93642c90c69a	44339363-8791-433b-93d4-93642c90c69a	{"sub": "44339363-8791-433b-93d4-93642c90c69a", "name": "Test03", "role": "employee", "email": "test03@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-09 02:43:16.953816+00	2025-04-09 02:43:16.953873+00	2025-04-09 02:43:16.953873+00	8882a2f8-81bc-4b43-9898-e202f2944c84
66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	{"sub": "66297fcd-b66d-4deb-ad5b-f24ba1dfd26a", "name": "Delivery", "role": "employee", "email": "delivery@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-10 19:30:06.782108+00	2025-04-10 19:30:06.784553+00	2025-04-10 19:30:06.784553+00	f0d850c8-4ef7-4c6d-9124-c2d34964c398
412b6cda-4dbd-4bec-832e-1509eaf56414	412b6cda-4dbd-4bec-832e-1509eaf56414	{"sub": "412b6cda-4dbd-4bec-832e-1509eaf56414", "name": "Capability", "role": "employee", "email": "capability@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-10 19:35:38.508744+00	2025-04-10 19:35:38.508819+00	2025-04-10 19:35:38.508819+00	9b7241d9-d0f0-4cfb-95e6-99ec7e022ba9
53080ade-33ee-4342-ae5e-9683f4368b6a	53080ade-33ee-4342-ae5e-9683f4368b6a	{"sub": "53080ade-33ee-4342-ae5e-9683f4368b6a", "name": "people lead", "role": "employee", "email": "peoplelead@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-10 19:43:55.525306+00	2025-04-10 19:43:55.525358+00	2025-04-10 19:43:55.525358+00	087a45fc-836e-43b5-bf38-b15c4167df8d
0475f20b-25ce-485e-95cc-bd729859637d	0475f20b-25ce-485e-95cc-bd729859637d	{"sub": "0475f20b-25ce-485e-95cc-bd729859637d", "name": "Talent lead", "role": "employee", "email": "talent@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-10 19:44:53.870073+00	2025-04-10 19:44:53.870128+00	2025-04-10 19:44:53.870128+00	17fc0bfd-7c2d-40cf-b1e5-f3d0f189f764
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
97af4dbc-bc49-480b-a851-142d4eaaf6df	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-07 21:49:41.437749+00	2025-04-10 01:20:04.205469+00	\N	aal1	\N	2025-04-10 01:20:04.205385	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	201.173.66.116	\N
85c6b0e3-9366-4ce2-b77b-25026aa62922	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-04 22:57:33.037189+00	2025-04-07 06:04:40.735412+00	\N	aal1	\N	2025-04-07 06:04:40.734585	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	187.190.181.239	\N
88c69472-f73c-4cd4-a282-29729ccfacfb	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-07 06:04:47.003094+00	2025-04-07 06:04:47.003094+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	187.190.181.239	\N
3b4835ff-150d-411c-9163-e901122cd92c	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-07 06:11:17.102941+00	2025-04-07 06:11:17.102941+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	187.190.181.239	\N
e356093c-d48d-4593-ad76-c0f8f198215e	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-07 06:18:07.783482+00	2025-04-07 21:02:51.072978+00	\N	aal1	\N	2025-04-07 21:02:51.072904	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	131.178.102.212	\N
d7992f80-8d49-452e-b502-35b830be963a	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	2025-04-04 21:09:21.556257+00	2025-04-07 21:09:08.959286+00	\N	aal1	\N	2025-04-07 21:09:08.959212	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.196	\N
48c8598d-bb2a-43f1-9d25-36462d3e8c76	7dfad126-2905-431a-829b-fcae851fe102	2025-04-07 21:40:35.129189+00	2025-04-07 21:40:35.129189+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.220	\N
4fca3c70-db1b-4df9-b886-2128414bfff2	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-04 21:10:08.113152+00	2025-04-07 21:49:40.062136+00	\N	aal1	\N	2025-04-07 21:49:40.062059	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	131.178.102.172	\N
d213db54-7020-4fa5-8e48-069ed093578d	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-04 23:22:14.0165+00	2025-04-07 20:48:03.563015+00	\N	aal1	\N	2025-04-07 20:48:03.562941	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.220	\N
7076da94-128a-49a0-83ec-44cbdf37a44b	2eadd525-41bd-4c5d-9073-faf9c6b91714	2025-04-07 23:24:17.05751+00	2025-04-07 23:24:17.05751+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
6bac3d94-89e9-48a8-806e-f660cc2f3f64	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-07 22:00:08.377417+00	2025-04-07 23:16:29.650974+00	\N	aal1	\N	2025-04-07 23:16:29.650903	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
20c3aa32-bdab-4507-ba93-277b988c5e88	7dfad126-2905-431a-829b-fcae851fe102	2025-04-07 21:41:29.274689+00	2025-04-07 23:20:37.317303+00	\N	aal1	\N	2025-04-07 23:20:37.317234	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.196	\N
23d60cde-7e1f-4b09-9fc5-c1ee1aa38707	6eb32f88-231e-4237-9f93-6689a94b624d	2025-04-07 23:22:47.108651+00	2025-04-07 23:22:47.108651+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
bd306676-f60a-4666-a038-5c80d3c4efe7	7dfad126-2905-431a-829b-fcae851fe102	2025-04-07 23:35:55.72285+00	2025-04-10 19:39:44.929133+00	\N	aal1	\N	2025-04-10 19:39:44.929063	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
a1291826-8325-46d8-a380-7f1b5910c5e4	31fbe58a-c798-401a-b2aa-c06726293956	2025-04-07 23:30:10.222085+00	2025-04-07 23:30:10.222085+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
a82dfff5-488c-451d-9b51-8489f373de8f	0e41703f-9367-446f-ab66-0c5477edda65	2025-04-07 23:34:08.082589+00	2025-04-07 23:34:08.082589+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
130e0fb5-ad02-4b04-a09f-718a2beb5096	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-07 21:46:59.963512+00	2025-04-10 19:32:53.037375+00	\N	aal1	\N	2025-04-10 19:32:53.03729	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	131.178.102.196	\N
12276b70-03e0-4dd9-b0bb-44f782a60260	a004e928-2b22-4749-ad53-9232297705be	2025-04-07 23:37:10.570256+00	2025-04-07 23:37:10.570256+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
a678115e-7c12-4f2c-9ec9-36544e9c8552	204b4114-7454-40dd-afd4-d4521f0c2558	2025-04-08 00:06:55.667682+00	2025-04-08 00:06:55.667682+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
686747a6-69ff-4e0e-abea-f5c8eeba426e	392c88d5-a2c3-4a14-88d1-2d84bc8133c5	2025-04-08 00:08:41.302542+00	2025-04-08 00:08:41.302542+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
8e77a1a1-4e5c-430e-8252-cf7b0865629f	37a795b1-0a19-41ca-a09c-805dc258ac38	2025-04-08 00:16:29.329073+00	2025-04-08 00:16:29.329073+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
9579011c-9e5f-43f1-95bf-13f4a050844f	a0a40b5c-c8be-40f1-ae42-d8bb32677c8e	2025-04-08 00:23:45.397286+00	2025-04-08 00:23:45.397286+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
e788cb23-0f42-46f7-8493-84f661ace050	0a38c26c-3a86-42cb-b39b-c9c76848f0e5	2025-04-08 00:26:00.023577+00	2025-04-08 20:24:54.295482+00	\N	aal1	\N	2025-04-08 20:24:54.295393	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.212	\N
abe4b140-f120-46e6-a9dc-6dd324bd255c	577146a4-87b1-4f34-9bb1-824140ff4c54	2025-04-08 20:27:24.919354+00	2025-04-08 20:27:24.919354+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.212	\N
caeb9bac-6bbd-474d-82b2-a9ca1803d68a	809bf7bd-14ec-4553-9e37-90a697149799	2025-04-08 20:27:54.472835+00	2025-04-08 20:27:54.472835+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.212	\N
67d584b1-1b11-4350-b741-acfbb0858e06	412b6cda-4dbd-4bec-832e-1509eaf56414	2025-04-10 19:35:38.519925+00	2025-04-10 19:35:38.519925+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
4fe18208-4e51-4082-8856-293cc6493bb0	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 19:39:48.667872+00	2025-04-10 19:39:48.667872+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
e747ee9b-2fab-4953-bab9-f8ea6b6c8e05	53080ade-33ee-4342-ae5e-9683f4368b6a	2025-04-10 19:43:55.538489+00	2025-04-10 19:43:55.538489+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
3a053151-9528-4862-ab12-4f5fb3fbd0dc	9cdc8f90-0c14-4d94-bfba-45c371b30735	2025-04-08 20:32:52.80107+00	2025-04-09 02:31:54.264955+00	\N	aal1	\N	2025-04-09 02:31:54.264877	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
72089df5-7e88-4566-850c-b27ee357a286	2ccb7762-72c7-4aeb-93ab-5b628ea330f3	2025-04-09 02:40:56.5713+00	2025-04-09 02:40:56.5713+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
c3ce003f-8f43-4d15-8923-09412fcfc2e0	b314f0e1-5f44-48a5-9a99-30387795843c	2025-04-09 02:41:41.996063+00	2025-04-09 02:41:41.996063+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
090ea1cc-ac4d-405f-9a26-c1112daf2318	0475f20b-25ce-485e-95cc-bd729859637d	2025-04-10 19:44:53.878069+00	2025-04-10 19:44:53.878069+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
5bfb37df-b486-4f5f-a0a6-4a33f371866a	44339363-8791-433b-93d4-93642c90c69a	2025-04-09 02:43:16.963213+00	2025-04-10 04:17:48.480492+00	\N	aal1	\N	2025-04-10 04:17:48.48042	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
fff2c5c9-c6c6-44e3-8fec-a0b85fab5581	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-10 01:20:04.572385+00	2025-04-10 19:45:03.363222+00	\N	aal1	\N	2025-04-10 19:45:03.363155	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	131.178.102.172	\N
4c9d2a2f-2119-4f63-ae49-24cb1d31ceff	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-10 19:45:03.962924+00	2025-04-10 19:45:03.962924+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	131.178.102.172	\N
574dcacd-7698-41ca-8630-1203261e9df3	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 19:54:09.015359+00	2025-04-10 19:54:09.015359+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
5aa6ea21-37bf-4d10-b5f5-067f24ca2657	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 19:54:09.205351+00	2025-04-10 19:54:09.205351+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
422907f0-37fb-4c98-9f77-58011487397d	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 19:54:10.937667+00	2025-04-10 19:54:10.937667+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
c6efa894-a00f-4d8f-8e9f-d5d13662571a	564b41de-e4a1-4e56-bff7-c0681abc0718	2025-04-04 08:37:41.630831+00	2025-04-10 19:10:23.318311+00	\N	aal1	\N	2025-04-10 19:10:23.318218	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.132	\N
77c9457b-5750-468a-855f-6d0422f4d9a6	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-10 04:19:54.011773+00	2025-04-10 19:26:27.333819+00	\N	aal1	\N	2025-04-10 19:26:27.333716	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
2c7ce081-da33-4144-aa5a-1b51a7b68d8f	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	2025-04-10 19:30:06.798991+00	2025-04-10 19:30:06.798991+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
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
a678115e-7c12-4f2c-9ec9-36544e9c8552	2025-04-08 00:06:55.67795+00	2025-04-08 00:06:55.67795+00	password	b917b2aa-e255-4a02-98d5-13973585679c
686747a6-69ff-4e0e-abea-f5c8eeba426e	2025-04-08 00:08:41.306713+00	2025-04-08 00:08:41.306713+00	password	3d86bd0a-2d74-4870-b76d-53fa12878743
8e77a1a1-4e5c-430e-8252-cf7b0865629f	2025-04-08 00:16:29.339333+00	2025-04-08 00:16:29.339333+00	password	e14436e9-51dd-46b5-bb10-a2d3f97ad033
9579011c-9e5f-43f1-95bf-13f4a050844f	2025-04-08 00:23:45.402234+00	2025-04-08 00:23:45.402234+00	password	54db8ab2-bd74-458b-a3d4-ab578a09e75d
e788cb23-0f42-46f7-8493-84f661ace050	2025-04-08 00:26:00.03595+00	2025-04-08 00:26:00.03595+00	password	dde302bf-7a8d-4ef9-913b-64841af349b7
abe4b140-f120-46e6-a9dc-6dd324bd255c	2025-04-08 20:27:24.925786+00	2025-04-08 20:27:24.925786+00	password	17fc2ce7-e7ae-4264-8f4b-a186a42f853e
caeb9bac-6bbd-474d-82b2-a9ca1803d68a	2025-04-08 20:27:54.474908+00	2025-04-08 20:27:54.474908+00	password	e0cd5a84-6339-48ba-aae6-15db0fe62a8e
3a053151-9528-4862-ab12-4f5fb3fbd0dc	2025-04-08 20:32:52.808377+00	2025-04-08 20:32:52.808377+00	password	d90a9867-8607-455d-841d-158e72dc443b
72089df5-7e88-4566-850c-b27ee357a286	2025-04-09 02:40:56.580616+00	2025-04-09 02:40:56.580616+00	password	0806924b-70be-439a-b929-69a51a1930ea
c3ce003f-8f43-4d15-8923-09412fcfc2e0	2025-04-09 02:41:41.998021+00	2025-04-09 02:41:41.998021+00	password	9df22d6e-2a49-4e0e-900c-5a326593933e
5bfb37df-b486-4f5f-a0a6-4a33f371866a	2025-04-09 02:43:16.966914+00	2025-04-09 02:43:16.966914+00	password	788d2921-ea23-41f8-8ad9-244091680e7e
fff2c5c9-c6c6-44e3-8fec-a0b85fab5581	2025-04-10 01:20:04.581319+00	2025-04-10 01:20:04.581319+00	password	339f7959-2f9b-4019-82e7-9524002ca556
77c9457b-5750-468a-855f-6d0422f4d9a6	2025-04-10 04:19:54.019571+00	2025-04-10 04:19:54.019571+00	password	6eee7685-c9fc-42f9-8b0a-1937aeed7a51
2c7ce081-da33-4144-aa5a-1b51a7b68d8f	2025-04-10 19:30:06.808082+00	2025-04-10 19:30:06.808082+00	password	a63afc39-cb32-44d7-baa1-a05c1f8658a9
67d584b1-1b11-4350-b741-acfbb0858e06	2025-04-10 19:35:38.527461+00	2025-04-10 19:35:38.527461+00	password	47cb3d18-2614-446c-bde1-08d3daa8a58b
4fe18208-4e51-4082-8856-293cc6493bb0	2025-04-10 19:39:48.669953+00	2025-04-10 19:39:48.669953+00	password	70e419f4-e462-4775-b2dc-8bb6bd4c4d36
e747ee9b-2fab-4953-bab9-f8ea6b6c8e05	2025-04-10 19:43:55.545691+00	2025-04-10 19:43:55.545691+00	password	2cb5f217-3141-4175-bc58-0a0d538a5976
090ea1cc-ac4d-405f-9a26-c1112daf2318	2025-04-10 19:44:53.882739+00	2025-04-10 19:44:53.882739+00	password	c65fe9c8-c52b-4ab2-8b61-e43941f72a96
4c9d2a2f-2119-4f63-ae49-24cb1d31ceff	2025-04-10 19:45:03.965949+00	2025-04-10 19:45:03.965949+00	password	7606d69b-0f42-4e79-9107-b84da1ead10e
574dcacd-7698-41ca-8630-1203261e9df3	2025-04-10 19:54:09.023541+00	2025-04-10 19:54:09.023541+00	password	d48b912a-c628-4a64-aba9-c8292fdccbe4
5aa6ea21-37bf-4d10-b5f5-067f24ca2657	2025-04-10 19:54:09.207281+00	2025-04-10 19:54:09.207281+00	password	0d8b6f38-6347-4415-bcba-ad6371592994
422907f0-37fb-4c98-9f77-58011487397d	2025-04-10 19:54:10.940356+00	2025-04-10 19:54:10.940356+00	password	ebafc786-3777-4abf-b188-c861d59f9d78
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
00000000-0000-0000-0000-000000000000	100	npAoYHZw25Ssg4q2vtuGNg	577146a4-87b1-4f34-9bb1-824140ff4c54	f	2025-04-08 20:27:24.923809+00	2025-04-08 20:27:24.923809+00	\N	abe4b140-f120-46e6-a9dc-6dd324bd255c
00000000-0000-0000-0000-000000000000	101	icYblf3PxLQvV7cZ9N63aw	809bf7bd-14ec-4553-9e37-90a697149799	f	2025-04-08 20:27:54.473629+00	2025-04-08 20:27:54.473629+00	\N	caeb9bac-6bbd-474d-82b2-a9ca1803d68a
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
00000000-0000-0000-0000-000000000000	86	PZKA8CMZKUXLs4V6yj2xrA	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-07 23:35:55.724559+00	2025-04-08 21:25:25.402959+00	\N	bd306676-f60a-4666-a038-5c80d3c4efe7
00000000-0000-0000-0000-000000000000	98	s2uZNcWy4h9ytevN0P1K_Q	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-08 07:30:34.691282+00	2025-04-08 21:29:32.352267+00	UmvlMdeYnW7czRAGaqw85w	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	75	QgM89_8W2zePN_9MPR9uMg	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-07 21:49:40.057753+00	2025-04-07 21:49:40.057753+00	b5TFQMzrX4TXpXqH9EAkBg	4fca3c70-db1b-4df9-b886-2128414bfff2
00000000-0000-0000-0000-000000000000	77	dcwqdv9YMPDnMpeJKdn_mg	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-07 22:00:08.379614+00	2025-04-07 23:16:29.641859+00	\N	6bac3d94-89e9-48a8-806e-f660cc2f3f64
00000000-0000-0000-0000-000000000000	78	79oZ1NZwlZUFID52Wzqrkw	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-07 23:16:29.645606+00	2025-04-07 23:16:29.645606+00	dcwqdv9YMPDnMpeJKdn_mg	6bac3d94-89e9-48a8-806e-f660cc2f3f64
00000000-0000-0000-0000-000000000000	73	EOjaEHCcrqDML3cRhUDehQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-07 21:45:30.440868+00	2025-04-07 23:17:00.02867+00	7zhDKnqeML8lkNhkqYvNeg	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	102	4sS_GPrNd--oxIfriioFOw	9cdc8f90-0c14-4d94-bfba-45c371b30735	t	2025-04-08 20:32:52.803418+00	2025-04-08 21:32:55.537787+00	\N	3a053151-9528-4862-ab12-4f5fb3fbd0dc
00000000-0000-0000-0000-000000000000	72	tuogQxD9ZtRZcPxikypQ4g	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-07 21:41:29.275449+00	2025-04-07 23:20:37.313504+00	\N	20c3aa32-bdab-4507-ba93-277b988c5e88
00000000-0000-0000-0000-000000000000	80	njE1rD7Ba262eA8y_u0jbw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-07 23:20:37.314867+00	2025-04-07 23:20:37.314867+00	tuogQxD9ZtRZcPxikypQ4g	20c3aa32-bdab-4507-ba93-277b988c5e88
00000000-0000-0000-0000-000000000000	81	VJOXt3qZD-sGIDPledVYGg	6eb32f88-231e-4237-9f93-6689a94b624d	f	2025-04-07 23:22:47.11022+00	2025-04-07 23:22:47.11022+00	\N	23d60cde-7e1f-4b09-9fc5-c1ee1aa38707
00000000-0000-0000-0000-000000000000	82	MiwHLK3rT8IWnD6mPu8d_w	2eadd525-41bd-4c5d-9073-faf9c6b91714	f	2025-04-07 23:24:17.058544+00	2025-04-07 23:24:17.058544+00	\N	7076da94-128a-49a0-83ec-44cbdf37a44b
00000000-0000-0000-0000-000000000000	74	amITdUffA2-SIkyDFyh-9A	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-07 21:46:59.965465+00	2025-04-07 23:27:03.240672+00	\N	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	84	uahr0Fg9x3HbWNDRYYxtvw	31fbe58a-c798-401a-b2aa-c06726293956	f	2025-04-07 23:30:10.223972+00	2025-04-07 23:30:10.223972+00	\N	a1291826-8325-46d8-a380-7f1b5910c5e4
00000000-0000-0000-0000-000000000000	85	gZBvQjHk9HYWm2IRYCZv-w	0e41703f-9367-446f-ab66-0c5477edda65	f	2025-04-07 23:34:08.08368+00	2025-04-07 23:34:08.08368+00	\N	a82dfff5-488c-451d-9b51-8489f373de8f
00000000-0000-0000-0000-000000000000	87	zCSJSx6JVK-O02Yph3EBhg	a004e928-2b22-4749-ad53-9232297705be	f	2025-04-07 23:37:10.574206+00	2025-04-07 23:37:10.574206+00	\N	12276b70-03e0-4dd9-b0bb-44f782a60260
00000000-0000-0000-0000-000000000000	88	SqnDfjxhMLVbdtCnzcllYw	204b4114-7454-40dd-afd4-d4521f0c2558	f	2025-04-08 00:06:55.670175+00	2025-04-08 00:06:55.670175+00	\N	a678115e-7c12-4f2c-9ec9-36544e9c8552
00000000-0000-0000-0000-000000000000	89	A-t5bQKPmbrVLXBlidYx_g	392c88d5-a2c3-4a14-88d1-2d84bc8133c5	f	2025-04-08 00:08:41.304369+00	2025-04-08 00:08:41.304369+00	\N	686747a6-69ff-4e0e-abea-f5c8eeba426e
00000000-0000-0000-0000-000000000000	90	ezz954GUXykfm4LV59G_CA	37a795b1-0a19-41ca-a09c-805dc258ac38	f	2025-04-08 00:16:29.332549+00	2025-04-08 00:16:29.332549+00	\N	8e77a1a1-4e5c-430e-8252-cf7b0865629f
00000000-0000-0000-0000-000000000000	79	03htvI3LIBsGTy4icya8Sw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-07 23:17:00.029321+00	2025-04-08 00:18:56.984288+00	EOjaEHCcrqDML3cRhUDehQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	92	YB4VZMowF5tFv3_yklLSiQ	a0a40b5c-c8be-40f1-ae42-d8bb32677c8e	f	2025-04-08 00:23:45.399209+00	2025-04-08 00:23:45.399209+00	\N	9579011c-9e5f-43f1-95bf-13f4a050844f
00000000-0000-0000-0000-000000000000	104	EVOrVIovvBg-3v1Jg4zu_Q	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-08 21:29:32.352889+00	2025-04-08 22:30:55.601315+00	s2uZNcWy4h9ytevN0P1K_Q	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	83	UBsgqHzePJ4ALLxAHJo1ZA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-07 23:27:03.244701+00	2025-04-08 02:52:04.343147+00	amITdUffA2-SIkyDFyh-9A	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	94	whdlawlRgs_u9BXuZ44tRQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-08 02:52:04.348591+00	2025-04-08 04:10:43.326061+00	UBsgqHzePJ4ALLxAHJo1ZA	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	103	kHDRG1FylVlTSX8_85rgmw	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-08 21:25:25.405393+00	2025-04-08 22:32:41.415749+00	PZKA8CMZKUXLs4V6yj2xrA	bd306676-f60a-4666-a038-5c80d3c4efe7
00000000-0000-0000-0000-000000000000	95	PO1-4VtCOx7cH2W5KKDiLA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-08 04:10:43.329984+00	2025-04-08 05:08:46.487392+00	whdlawlRgs_u9BXuZ44tRQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	96	Q7yPEN7L3dN2MwASuf98XQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-08 05:08:46.488152+00	2025-04-08 06:06:53.367748+00	PO1-4VtCOx7cH2W5KKDiLA	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	105	n7ePg5Snd7gf8tWkJ74R9w	9cdc8f90-0c14-4d94-bfba-45c371b30735	t	2025-04-08 21:32:55.540609+00	2025-04-08 22:53:58.48489+00	4sS_GPrNd--oxIfriioFOw	3a053151-9528-4862-ab12-4f5fb3fbd0dc
00000000-0000-0000-0000-000000000000	97	UmvlMdeYnW7czRAGaqw85w	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-08 06:06:53.370408+00	2025-04-08 07:30:34.687748+00	Q7yPEN7L3dN2MwASuf98XQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	93	FYyDqqSvWmWnGOE-bZA1Ew	0a38c26c-3a86-42cb-b39b-c9c76848f0e5	t	2025-04-08 00:26:00.028859+00	2025-04-08 20:24:54.270551+00	\N	e788cb23-0f42-46f7-8493-84f661ace050
00000000-0000-0000-0000-000000000000	99	4PBQFmDxyH9b7fG1euK1Mw	0a38c26c-3a86-42cb-b39b-c9c76848f0e5	f	2025-04-08 20:24:54.282067+00	2025-04-08 20:24:54.282067+00	FYyDqqSvWmWnGOE-bZA1Ew	e788cb23-0f42-46f7-8493-84f661ace050
00000000-0000-0000-0000-000000000000	106	7QDV6M_c_JWSc5w4s5K6Bg	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-08 22:30:55.607212+00	2025-04-08 23:34:46.143039+00	EVOrVIovvBg-3v1Jg4zu_Q	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	108	YpswwKFBC6cWv5Y7n5blPw	9cdc8f90-0c14-4d94-bfba-45c371b30735	t	2025-04-08 22:53:58.488348+00	2025-04-09 01:33:28.460242+00	n7ePg5Snd7gf8tWkJ74R9w	3a053151-9528-4862-ab12-4f5fb3fbd0dc
00000000-0000-0000-0000-000000000000	109	qPGcHVRMZgWCf3vcownmkQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-08 23:34:46.147674+00	2025-04-09 01:45:09.60527+00	7QDV6M_c_JWSc5w4s5K6Bg	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	110	9Xc10tGTkL0A35RL3e3Cjg	9cdc8f90-0c14-4d94-bfba-45c371b30735	t	2025-04-09 01:33:28.467489+00	2025-04-09 02:31:54.259304+00	YpswwKFBC6cWv5Y7n5blPw	3a053151-9528-4862-ab12-4f5fb3fbd0dc
00000000-0000-0000-0000-000000000000	112	wFediV_7eKwHhMqVgVh7Mw	9cdc8f90-0c14-4d94-bfba-45c371b30735	f	2025-04-09 02:31:54.26112+00	2025-04-09 02:31:54.26112+00	9Xc10tGTkL0A35RL3e3Cjg	3a053151-9528-4862-ab12-4f5fb3fbd0dc
00000000-0000-0000-0000-000000000000	113	D-KOWcPjMc5eK214EF_BuQ	2ccb7762-72c7-4aeb-93ab-5b628ea330f3	f	2025-04-09 02:40:56.575706+00	2025-04-09 02:40:56.575706+00	\N	72089df5-7e88-4566-850c-b27ee357a286
00000000-0000-0000-0000-000000000000	114	2s19AtrDMjNdqYKpC9ZIUQ	b314f0e1-5f44-48a5-9a99-30387795843c	f	2025-04-09 02:41:41.996838+00	2025-04-09 02:41:41.996838+00	\N	c3ce003f-8f43-4d15-8923-09412fcfc2e0
00000000-0000-0000-0000-000000000000	111	ixvZl35p1-S0nYVRbcB54A	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 01:45:09.610068+00	2025-04-09 02:45:07.630603+00	qPGcHVRMZgWCf3vcownmkQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	116	tHDRylcsXr9OyJXU8Ynayg	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 02:45:07.633915+00	2025-04-09 04:33:52.42952+00	ixvZl35p1-S0nYVRbcB54A	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	117	AsNkqZcHvVUeOcw4D-uWTw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 04:33:52.435724+00	2025-04-09 05:41:25.83138+00	tHDRylcsXr9OyJXU8Ynayg	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	118	8_AQSWWw_H7QH7lUexrMyQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 05:41:25.83483+00	2025-04-09 06:39:49.059494+00	AsNkqZcHvVUeOcw4D-uWTw	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	119	G_KU0dkzWRRBpr63iGHLmw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 06:39:49.062911+00	2025-04-09 07:38:19.579701+00	8_AQSWWw_H7QH7lUexrMyQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	76	_aVLmjWUt4HW-yl1xQXAhw	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-07 21:49:41.439423+00	2025-04-10 01:20:04.185664+00	\N	97af4dbc-bc49-480b-a851-142d4eaaf6df
00000000-0000-0000-0000-000000000000	91	-yo-yw5pvdXuL52oD11Uow	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-08 00:18:56.984985+00	2025-04-10 03:25:19.052651+00	03htvI3LIBsGTy4icya8Sw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	115	ZoOi4jETrqty8HAqbwwCOw	44339363-8791-433b-93d4-93642c90c69a	t	2025-04-09 02:43:16.964847+00	2025-04-10 04:17:48.473406+00	\N	5bfb37df-b486-4f5f-a0a6-4a33f371866a
00000000-0000-0000-0000-000000000000	120	Pi5smE5StSnrAL4g9LcccQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 07:38:19.590067+00	2025-04-09 09:23:16.09854+00	G_KU0dkzWRRBpr63iGHLmw	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	121	coZCWAxsF53NhleeBS9XUQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 09:23:16.102308+00	2025-04-09 17:49:52.212415+00	Pi5smE5StSnrAL4g9LcccQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	123	nJhOX3m1PY6kGLeOXJzkGQ	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-10 01:20:04.193146+00	2025-04-10 01:20:04.193146+00	_aVLmjWUt4HW-yl1xQXAhw	97af4dbc-bc49-480b-a851-142d4eaaf6df
00000000-0000-0000-0000-000000000000	122	llWCURoIASaRHm3vP_whzw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 17:49:52.221462+00	2025-04-10 02:12:14.915338+00	coZCWAxsF53NhleeBS9XUQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	125	NUUauIzi3ZiOMYMDlpB0BA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 02:12:14.920456+00	2025-04-10 03:11:38.146871+00	llWCURoIASaRHm3vP_whzw	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	126	0u1k_asIIAHkSlWjHDVPbQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 03:11:38.153186+00	2025-04-10 04:09:41.338084+00	NUUauIzi3ZiOMYMDlpB0BA	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	129	SB1G4Fyj3E2K81EM5fcVsg	44339363-8791-433b-93d4-93642c90c69a	f	2025-04-10 04:17:48.476206+00	2025-04-10 04:17:48.476206+00	ZoOi4jETrqty8HAqbwwCOw	5bfb37df-b486-4f5f-a0a6-4a33f371866a
00000000-0000-0000-0000-000000000000	127	o4bwnTmV94etK5ytCRj3Lg	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 03:25:19.055244+00	2025-04-10 04:23:56.494281+00	-yo-yw5pvdXuL52oD11Uow	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	130	bP0zT-lzgNLl8MZJPfReRg	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-10 04:19:54.017075+00	2025-04-10 05:20:29.339814+00	\N	77c9457b-5750-468a-855f-6d0422f4d9a6
00000000-0000-0000-0000-000000000000	128	hBmq-rixMl2rLqjP_yx85A	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 04:09:41.341659+00	2025-04-10 05:20:40.377984+00	0u1k_asIIAHkSlWjHDVPbQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	131	ybLr3tYrv-vlHYHv85k_oQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 04:23:56.498149+00	2025-04-10 05:24:45.735455+00	o4bwnTmV94etK5ytCRj3Lg	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	132	PGAEXMynenM6GjR_Oe2G_w	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-10 05:20:29.344479+00	2025-04-10 06:18:44.788475+00	bP0zT-lzgNLl8MZJPfReRg	77c9457b-5750-468a-855f-6d0422f4d9a6
00000000-0000-0000-0000-000000000000	134	Wa6_MoBJQHGf1dEIFLPRxQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 05:24:45.73609+00	2025-04-10 06:23:19.908127+00	ybLr3tYrv-vlHYHv85k_oQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	133	A7gqYt3EoiYuP1QPlcJwyA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 05:20:40.378375+00	2025-04-10 06:29:28.909254+00	hBmq-rixMl2rLqjP_yx85A	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	137	4RCPxtjmYV13NFJA67w3-w	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 06:29:28.911228+00	2025-04-10 07:29:14.50608+00	A7gqYt3EoiYuP1QPlcJwyA	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	135	8FTb3844kfOaSuAZ7a2aIA	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-10 06:18:44.792763+00	2025-04-10 07:33:57.191263+00	PGAEXMynenM6GjR_Oe2G_w	77c9457b-5750-468a-855f-6d0422f4d9a6
00000000-0000-0000-0000-000000000000	138	J0aYBK2OjKqA2PycM416jQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 07:29:14.511149+00	2025-04-10 08:27:17.968298+00	4RCPxtjmYV13NFJA67w3-w	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	139	ZTVogjSz11s8bNB59gzZTg	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-10 07:33:57.195564+00	2025-04-10 08:32:12.784507+00	8FTb3844kfOaSuAZ7a2aIA	77c9457b-5750-468a-855f-6d0422f4d9a6
00000000-0000-0000-0000-000000000000	140	_UEZ5Ib1E06ZtsQdJSO7Mg	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 08:27:17.972834+00	2025-04-10 09:25:36.901949+00	J0aYBK2OjKqA2PycM416jQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	141	7Mtynyh9bn8ufmeLP_w70Q	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-10 08:32:12.787458+00	2025-04-10 09:30:41.578936+00	ZTVogjSz11s8bNB59gzZTg	77c9457b-5750-468a-855f-6d0422f4d9a6
00000000-0000-0000-0000-000000000000	143	ibHBVMHvqrNQ7KJJALzf_w	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-10 09:30:41.58311+00	2025-04-10 10:29:27.293246+00	7Mtynyh9bn8ufmeLP_w70Q	77c9457b-5750-468a-855f-6d0422f4d9a6
00000000-0000-0000-0000-000000000000	136	9E6tFbnttREb04aSqtx4xw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 06:23:19.910449+00	2025-04-10 17:41:28.311428+00	Wa6_MoBJQHGf1dEIFLPRxQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	145	9kyeW-0s1SZuRomro6ZulQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 17:41:28.318052+00	2025-04-10 19:10:23.300447+00	9E6tFbnttREb04aSqtx4xw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	146	UJZ3MvTKuUw-tn1XjLxMSg	564b41de-e4a1-4e56-bff7-c0681abc0718	f	2025-04-10 19:10:23.30706+00	2025-04-10 19:10:23.30706+00	9kyeW-0s1SZuRomro6ZulQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	144	-hciPUu6fKEes738wlPxog	7478c90f-4de7-494d-ae79-fc28756dc4ab	t	2025-04-10 10:29:27.299444+00	2025-04-10 19:26:27.32499+00	ibHBVMHvqrNQ7KJJALzf_w	77c9457b-5750-468a-855f-6d0422f4d9a6
00000000-0000-0000-0000-000000000000	147	EKgPZItrDazv-zPrnCtqlw	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-10 19:26:27.329767+00	2025-04-10 19:26:27.329767+00	-hciPUu6fKEes738wlPxog	77c9457b-5750-468a-855f-6d0422f4d9a6
00000000-0000-0000-0000-000000000000	148	2usjxIDVKLayXsfnGCeJCA	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	f	2025-04-10 19:30:06.804784+00	2025-04-10 19:30:06.804784+00	\N	2c7ce081-da33-4144-aa5a-1b51a7b68d8f
00000000-0000-0000-0000-000000000000	142	a2StN3vOekZi8k6LU81_qQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 09:25:36.907593+00	2025-04-10 19:32:53.029018+00	_UEZ5Ib1E06ZtsQdJSO7Mg	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	149	N6h8AXHpRRK4QAunh3Y2fw	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-10 19:32:53.033214+00	2025-04-10 19:32:53.033214+00	a2StN3vOekZi8k6LU81_qQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	150	fVIaQyrfCwLwGjTO4VFCPA	412b6cda-4dbd-4bec-832e-1509eaf56414	f	2025-04-10 19:35:38.522037+00	2025-04-10 19:35:38.522037+00	\N	67d584b1-1b11-4350-b741-acfbb0858e06
00000000-0000-0000-0000-000000000000	107	zCsi7v0x4XyZcBPcWPrKaQ	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-08 22:32:41.416408+00	2025-04-10 19:39:44.925048+00	kHDRG1FylVlTSX8_85rgmw	bd306676-f60a-4666-a038-5c80d3c4efe7
00000000-0000-0000-0000-000000000000	151	X7YK3cGyB6lResC-JZNp-Q	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 19:39:44.925714+00	2025-04-10 19:39:44.925714+00	zCsi7v0x4XyZcBPcWPrKaQ	bd306676-f60a-4666-a038-5c80d3c4efe7
00000000-0000-0000-0000-000000000000	152	P7jmlkbKPh0XJfKTJto17g	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 19:39:48.668738+00	2025-04-10 19:39:48.668738+00	\N	4fe18208-4e51-4082-8856-293cc6493bb0
00000000-0000-0000-0000-000000000000	153	QxAOx3-jH6u5EnFBHqcL2A	53080ade-33ee-4342-ae5e-9683f4368b6a	f	2025-04-10 19:43:55.540853+00	2025-04-10 19:43:55.540853+00	\N	e747ee9b-2fab-4953-bab9-f8ea6b6c8e05
00000000-0000-0000-0000-000000000000	154	0HOhzmDH3v4-ABlZ5p0K9w	0475f20b-25ce-485e-95cc-bd729859637d	f	2025-04-10 19:44:53.878791+00	2025-04-10 19:44:53.878791+00	\N	090ea1cc-ac4d-405f-9a26-c1112daf2318
00000000-0000-0000-0000-000000000000	124	_-R_jpB2wlog59xo67nxRw	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-10 01:20:04.578363+00	2025-04-10 19:45:03.358538+00	\N	fff2c5c9-c6c6-44e3-8fec-a0b85fab5581
00000000-0000-0000-0000-000000000000	155	lnDLrPyUxFE_Oz2g8XOj7w	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-10 19:45:03.359111+00	2025-04-10 19:45:03.359111+00	_-R_jpB2wlog59xo67nxRw	fff2c5c9-c6c6-44e3-8fec-a0b85fab5581
00000000-0000-0000-0000-000000000000	156	4C1sUC8UV-_i2z_aVh-Otw	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-10 19:45:03.964389+00	2025-04-10 19:45:03.964389+00	\N	4c9d2a2f-2119-4f63-ae49-24cb1d31ceff
00000000-0000-0000-0000-000000000000	157	iqmyvfR8P-W2s7uUzkFbgw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 19:54:09.017888+00	2025-04-10 19:54:09.017888+00	\N	574dcacd-7698-41ca-8630-1203261e9df3
00000000-0000-0000-0000-000000000000	158	eWPzPO3pz05smHgI7PUj7Q	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 19:54:09.206067+00	2025-04-10 19:54:09.206067+00	\N	5aa6ea21-37bf-4d10-b5f5-067f24ca2657
00000000-0000-0000-0000-000000000000	159	H3RmHlQuRkZr40CypavTmA	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 19:54:10.938493+00	2025-04-10 19:54:10.938493+00	\N	422907f0-37fb-4c98-9f77-58011487397d
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

COPY "public"."Administrador" ("id") FROM stdin;
7478c90f-4de7-494d-ae79-fc28756dc4ab
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

COPY "public"."Empleado" ("ID_Empleado", "Nombre", "Rol", "ID_Departamento", "Nivel", "Cargabilidad", "ID_CapabilityLead", "FechaContratacion", "FechaUltNivel", "ID_PeopleLead") FROM stdin;
7478c90f-4de7-494d-ae79-fc28756dc4ab	rick	skjxn	\N	12	\N	\N	\N	\N	\N
b47428a9-2529-4a4a-b02f-5c42648e88a9	Isaac	ajksnkc	\N	12	\N	\N	\N	\N	\N
5314bfcf-8401-457f-b7a7-2221ea64777c	Betanzo	dhxbs	\N	12	\N	\N	\N	\N	\N
9950b2e9-632f-42ff-b259-726ede4e408f	Emir 	El mejor de todos 	\N	10	\N	\N	\N	\N	\N
dee4835c-764c-40fb-bf0b-3bff8a0457d4	Pancho Naranjas	maestro de s teorico	\N	12	\N	\N	\N	\N	\N
ff98b050-236d-4a28-8aea-567f03b9f3c3	Ramón Antonio Naranjo Sarmiento	s master 2	\N	12	\N	\N	\N	\N	\N
9d6ddaee-5f7c-4cef-8705-6db6a8d11109	yi	jsasnxkj	\N	akjsxnaks	0%	\N	\N	\N	\N
c3886a9b-c360-4fec-b16d-058747789ee2	aksc	jnXKj	\N	12	0%	\N	2025-04-04	2025-04-04	\N
b3f42013-85ab-406b-b823-89ab1da60b82	John Doe	Developer	4a349d40-f10f-46f7-9465-259a1669f2b2	Senior	80%	750242c6-e9f3-4c20-bb49-f39fc02fcc51	\N	\N	a02d6134-314f-4c1e-a1e2-9594df42bf01
9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	Jane Smith	HR Manager	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Manager	100%	3660958c-1eaa-4b94-aef2-88570ab6613d	\N	\N	d87e4b98-e814-4409-9d30-1d93333b46ca
a57aab4d-0c82-479b-91cd-2502a0c7dac8	Sergio  r	ajklsbxjhc	2665a062-12cf-4d0a-9e4b-f3805418a6a8	12	0%	\N	2025-04-07	2025-04-07	\N
7dfad126-2905-431a-829b-fcae851fe102	David	Dev	4a349d40-f10f-46f7-9465-259a1669f2b2	10	0%	\N	2025-04-07	2025-04-07	\N
6eb32f88-231e-4237-9f93-6689a94b624d	sd	asda	2665a062-12cf-4d0a-9e4b-f3805418a6a8	12	0%	\N	2025-04-07	2025-04-07	\N
2eadd525-41bd-4c5d-9073-faf9c6b91714	Auch	devops	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-07	2025-04-07	\N
31fbe58a-c798-401a-b2aa-c06726293956	test	jaisn	4a349d40-f10f-46f7-9465-259a1669f2b2	11	0%	\N	2025-04-07	2025-04-07	\N
0e41703f-9367-446f-ab66-0c5477edda65	ajsn	an	a337fc73-b929-4ce7-b71b-5c3c0ad45e06	11	0%	\N	2025-04-07	2025-04-07	\N
a004e928-2b22-4749-ad53-9232297705be	kns	qwe	46e63a6e-e0b1-4d27-b213-94005e83de75	12	0%	\N	2025-04-07	2025-04-07	\N
204b4114-7454-40dd-afd4-d4521f0c2558	a3	ajs	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-07	2025-04-07	\N
392c88d5-a2c3-4a14-88d1-2d84bc8133c5	sjd	js	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-07	2025-04-07	\N
17be3a68-8d97-4557-85e8-8e8cc9ecbc13	david Lozano	dev	\N	1	\N	\N	\N	\N	\N
37a795b1-0a19-41ca-a09c-805dc258ac38	jbhds	asjknx	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-07	2025-04-07	\N
a0a40b5c-c8be-40f1-ae42-d8bb32677c8e	1	as	31560a35-62a5-4020-9eb4-c211aee51a66	12	0%	\N	2025-04-07	2025-04-07	\N
0a38c26c-3a86-42cb-b39b-c9c76848f0e5	oij	bhj	dd6c79f7-80fd-48b3-97f6-119551d3d2c3	yug	0%	\N	2025-04-07	2025-04-07	\N
9cdc8f90-0c14-4d94-bfba-45c371b30735	zy2	yep	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-08	2025-04-08	\N
44339363-8791-433b-93d4-93642c90c69a	Test03	aslkm	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-08	2025-04-08	\N
66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	Delivery	Delivery	4a349d40-f10f-46f7-9465-259a1669f2b2	7	0%	\N	2025-04-10	2025-04-10	\N
412b6cda-4dbd-4bec-832e-1509eaf56414	Capability	Capability	4a349d40-f10f-46f7-9465-259a1669f2b2	8	0%	\N	2025-04-10	2025-04-10	\N
53080ade-33ee-4342-ae5e-9683f4368b6a	people lead	people lead	4a349d40-f10f-46f7-9465-259a1669f2b2	9	0%	\N	2025-04-10	2025-04-10	\N
0475f20b-25ce-485e-95cc-bd729859637d	Talent lead	Talent	dd6c79f7-80fd-48b3-97f6-119551d3d2c3	7	0%	\N	2025-04-10	2025-04-10	\N
\.


--
-- Data for Name: Capability_Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Capability_Lead" ("ID_CapabilityLead", "ID_Departamento", "Rol", "ID_Empleado") FROM stdin;
750242c6-e9f3-4c20-bb49-f39fc02fcc51	4a349d40-f10f-46f7-9465-259a1669f2b2	Capability Manager	b3f42013-85ab-406b-b823-89ab1da60b82
3660958c-1eaa-4b94-aef2-88570ab6613d	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Capability Lead	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
812d93a7-b853-4e0c-859a-af79fd2a4690	\N	\N	9950b2e9-632f-42ff-b259-726ede4e408f
ebe0368c-47c5-40a1-bcd7-323a0efe2bfa	\N	\N	a004e928-2b22-4749-ad53-9232297705be
49ebdafe-f3bc-4be9-b881-96a5c5d58cd7	\N	\N	7478c90f-4de7-494d-ae79-fc28756dc4ab
e2778248-1a76-4401-8f83-2e754c610bbd	\N	\N	dee4835c-764c-40fb-bf0b-3bff8a0457d4
89532d8d-4108-4d74-af70-d869d91576e3	\N	\N	412b6cda-4dbd-4bec-832e-1509eaf56414
\.


--
-- Data for Name: Certificados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Certificados" ("ID_Certificado", "Nombre", "Fecha_caducidad", "Documento", "ID_Empleado", "Verificacion", "Descripcion") FROM stdin;
3e0b6281-980f-4493-989e-dcae95344b68	Curso en FreakyAhh	\N	FreakyEats.pdf	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	\N	
7e7fead8-5dd7-4f49-b7dc-1a660c17bf5a	Maestria en Maestro	2025-04-30	Dr.pdf	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	\N	
7f2b6ca6-6e9c-4505-b9ae-4831a2061129	Doctorado en R.A.T	1869-01-21	ratapata.pdf	5314bfcf-8401-457f-b7a7-2221ea64777c	\N	
95ec4907-2222-4352-aadc-f049cdba8fcb	God de Cursos	2026-09-03	FreakyGod.goon	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	\N	
9831d19c-94c6-49b6-86d4-f434b7493061	Experto en Podologia	2026-11-26	MeEncantanLosPies.pdf	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	\N	
f23aa09a-8d3f-445f-b9b7-597feadf214e	Javascript Certificate	2025-04-08	document.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	f	adsasasadddddddddddddddddddddddddddddddddddddddddddddddddddddd
ca2ef2ef-4ba2-4191-8e1d-08597cae339e	Black Belt Scrom Master	2025-04-08	scrom.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	t	rayjdratarat
\.


--
-- Data for Name: Contacto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Contacto" ("PK_Contacto", "Email", "Num_Telefono", "ID_empleado") FROM stdin;
a1dd3af4-1807-4d20-bdef-6bb13d67eab1	jane.smith@example.com	1234567890	\N
28159de2-34b4-4e26-82ea-2426a36a4061	zic@tec.mx	\N	\N
9cdc8f90-0c14-4d94-bfba-45c371b30736	zy2@gmail.com	\N	\N
45611567-d68c-47ea-b5c7-7b84f54ded49	test03@g.com	\N	44339363-8791-433b-93d4-93642c90c69a
28d6a104-d3dd-4967-88f5-bde0c7f9057c	john.doe@example.com	987654321	b3f42013-85ab-406b-b823-89ab1da60b82
f5b106ff-c378-41b3-a757-a34a715c45b5	Delivery@g.com	\N	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a
e7eb3eeb-d7f8-49b4-91bb-bdb5ab37ad06	Capability@g.com	\N	412b6cda-4dbd-4bec-832e-1509eaf56414
e8012509-8630-4cb1-890c-5db9b21d9e08	peoplelead@g.com	\N	53080ade-33ee-4342-ae5e-9683f4368b6a
b358ffd9-563f-4320-b4c9-346cd9853248	Talent@g.com	\N	0475f20b-25ce-485e-95cc-bd729859637d
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

COPY "public"."Delivery_Lead" ("ID_DeliveryLead", "Nombre", "Rol", "ID_Empleado") FROM stdin;
536e085a-fb2e-4c56-892d-35625a943941	Alice Johnson	Delivery Manager	\N
c30266b2-324d-442c-8702-b99ece958f29	Bob Brown	Delivery Lead	\N
04dde96b-200b-4a8a-86a3-b3498478a248	\N	\N	9950b2e9-632f-42ff-b259-726ede4e408f
83f73d8c-88f1-4ef3-bec1-86da540a3442	\N	\N	44339363-8791-433b-93d4-93642c90c69a
676a2e7a-3161-4213-b3be-0a90521d6786	\N	\N	b47428a9-2529-4a4a-b02f-5c42648e88a9
84266509-ec88-43d5-82c5-f3ed1c8386b0	\N	\N	a004e928-2b22-4749-ad53-9232297705be
7a14817b-7047-4e8b-bb84-433beb63d0e2	\N	\N	dee4835c-764c-40fb-bf0b-3bff8a0457d4
e5595827-0691-4f9d-a583-02b04e8f0e61	\N	\N	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a
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
6cf4dbcf-058b-4a42-b48a-6e33272bde60	hard	JavaScript Development
a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb	soft	Team Leadership
36a5b1cc-971b-49a1-945c-790da3403e70	soft	suavecito
5d3bad23-c29d-4f5c-9911-aeb084227398	hard	no lee
25a67b3f-87c6-43d0-92ca-93885a6e09e0	soft	lol
09da5759-50da-4252-8fb9-a50d4b1eda4b	hard	xd
\.


--
-- Data for Name: Empleado_Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Empleado_Habilidades" ("ID_Empleado", "ID_Habilidad") FROM stdin;
b3f42013-85ab-406b-b823-89ab1da60b82	6cf4dbcf-058b-4a42-b48a-6e33272bde60
9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb
ff98b050-236d-4a28-8aea-567f03b9f3c3	6cf4dbcf-058b-4a42-b48a-6e33272bde60
ff98b050-236d-4a28-8aea-567f03b9f3c3	a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb
ff98b050-236d-4a28-8aea-567f03b9f3c3	25a67b3f-87c6-43d0-92ca-93885a6e09e0
ff98b050-236d-4a28-8aea-567f03b9f3c3	5d3bad23-c29d-4f5c-9911-aeb084227398
b3f42013-85ab-406b-b823-89ab1da60b82	a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb
b3f42013-85ab-406b-b823-89ab1da60b82	25a67b3f-87c6-43d0-92ca-93885a6e09e0
b3f42013-85ab-406b-b823-89ab1da60b82	36a5b1cc-971b-49a1-945c-790da3403e70
b3f42013-85ab-406b-b823-89ab1da60b82	5d3bad23-c29d-4f5c-9911-aeb084227398
b3f42013-85ab-406b-b823-89ab1da60b82	09da5759-50da-4252-8fb9-a50d4b1eda4b
\.


--
-- Data for Name: People_lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."People_lead" ("ID", "ID_Empleado") FROM stdin;
a02d6134-314f-4c1e-a1e2-9594df42bf01	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
d87e4b98-e814-4409-9d30-1d93333b46ca	b3f42013-85ab-406b-b823-89ab1da60b82
3632a0a8-9de2-4fd9-a14f-4b08da3fa919	7478c90f-4de7-494d-ae79-fc28756dc4ab
a0d82ef6-60ce-4057-b0df-81b9e7aecbcc	44339363-8791-433b-93d4-93642c90c69a
9a5a94b8-99d4-4457-b7b7-a27e143429b0	a004e928-2b22-4749-ad53-9232297705be
16af9aa7-11b8-4ad2-abdc-70d02096b65c	53080ade-33ee-4342-ae5e-9683f4368b6a
\.


--
-- Data for Name: FeedBack; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."FeedBack" ("ID_FeedBack", "ID_People_lead", "ID_Empleado", "Descripcion", "AreaMejora", "Desempeno") FROM stdin;
63ed1dcb-8c9a-407d-9d02-592e8f5b7a4b	d87e4b98-e814-4409-9d30-1d93333b46ca	b3f42013-85ab-406b-b823-89ab1da60b82	Great work on the project	Time management	Excellent
831e63de-9398-4fdf-a250-88c039dc028b	a02d6134-314f-4c1e-a1e2-9594df42bf01	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	Good leadership skills	Recruitment strategies	Good
\.


--
-- Data for Name: Intereses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Intereses" ("ID_Interes", "Descripcion", "ID_Empleado") FROM stdin;
18a7b3e7-f472-4ad3-be59-a2fab50fb290	lolol	ff98b050-236d-4a28-8aea-567f03b9f3c3
055820e1-2eec-4113-8b3f-42ee4c0c86de	xd2	ff98b050-236d-4a28-8aea-567f03b9f3c3
\.


--
-- Data for Name: Metas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Metas" ("ID_meta", "Nombre", "Tipo_Meta", "Plazo", "Descripcion", "Fecha_limite", "ID_Empleado", "ID_Revisor", "Registrada", "Estado", "Self_Reflection") FROM stdin;
91e3e15b-59c5-4060-849b-d373432f41bc	Complete Project A	Short-term	3 months	Deliver Project A on time	2025-06-30	b3f42013-85ab-406b-b823-89ab1da60b82	d87e4b98-e814-4409-9d30-1d93333b46ca	t	In Progress	Need to improve time management
1a0023f2-9b81-40cd-99a9-62bcb8d4ef2a	Hire 5 Employees	Long-term	6 months	Expand the HR team	2025-12-31	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	a02d6134-314f-4c1e-a1e2-9594df42bf01	t	Not Started	Focus on recruitment strategies
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

COPY "public"."Talent_Lead" ("ID_TalentLead", "ID_Departamento", "Rol", "ID_Empleado") FROM stdin;
fb8d3db5-bf72-4a79-8b1e-f3691fc6d8c8	4a349d40-f10f-46f7-9465-259a1669f2b2	Talent Manager	\N
ad890a10-57a0-45ef-a809-b01cd55ba971	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Talent Lead	\N
a33c6e9f-17ca-4fc9-8ecf-b3b5aaa92545	\N	\N	a004e928-2b22-4749-ad53-9232297705be
666d4813-849f-4f09-ad74-a5511f41d607	\N	\N	0475f20b-25ce-485e-95cc-bd729859637d
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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 159, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
