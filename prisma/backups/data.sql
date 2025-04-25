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
00000000-0000-0000-0000-000000000000	d5f36818-fb3c-4364-8cf7-f722e04b0281	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 20:11:27.817082+00	
00000000-0000-0000-0000-000000000000	3182534c-1a7d-428d-897a-8e72f4aac42e	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 20:11:27.819974+00	
00000000-0000-0000-0000-000000000000	f7462287-207e-499b-9b5d-b313430bcc74	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 20:25:08.764844+00	
00000000-0000-0000-0000-000000000000	22bd3ff3-8566-42de-8aaa-6f3db34ba904	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 20:26:21.120914+00	
00000000-0000-0000-0000-000000000000	8c094371-18f9-42c4-8c06-8bf4382f55b9	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 20:31:34.428053+00	
00000000-0000-0000-0000-000000000000	86dcf7d4-f631-4280-bcce-9cecc9fdea19	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 20:31:34.43263+00	
00000000-0000-0000-0000-000000000000	ec22af42-0e9c-4e03-b230-a30525b790ed	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 20:33:25.300089+00	
00000000-0000-0000-0000-000000000000	18ed238c-05c9-4ea5-bc02-216e00e36f98	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 20:35:26.179963+00	
00000000-0000-0000-0000-000000000000	7924b04f-3b39-45e8-856c-e957625dc02f	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 20:38:02.306947+00	
00000000-0000-0000-0000-000000000000	09dc6952-5ab1-4514-b6ab-05df4cc4aafb	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 20:38:46.610504+00	
00000000-0000-0000-0000-000000000000	6d91f956-b3f8-418d-87f2-efa5be21a1d1	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 21:09:59.516191+00	
00000000-0000-0000-0000-000000000000	d098dcf0-2c0b-4613-bd35-7a560eac4307	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 21:09:59.518257+00	
00000000-0000-0000-0000-000000000000	291d84ff-f385-4b74-8fbc-f9bec3c75723	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 21:18:46.083366+00	
00000000-0000-0000-0000-000000000000	5484a189-f708-4d54-82b3-b0f3450b620e	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 21:20:44.590804+00	
00000000-0000-0000-0000-000000000000	b7eaf133-1a5d-4e7e-ba08-c778cdab4be5	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 21:20:44.593535+00	
00000000-0000-0000-0000-000000000000	6cf3d913-df18-4ea0-803d-c3d16855e760	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 21:32:44.501436+00	
00000000-0000-0000-0000-000000000000	4bfd8bd9-068d-4b75-b38f-550159ef505c	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 21:33:17.561991+00	
00000000-0000-0000-0000-000000000000	da9598a5-29ba-4340-9d25-98c1a1f15469	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 21:36:53.262994+00	
00000000-0000-0000-0000-000000000000	e9177b32-4739-4fda-8c63-523e611a109a	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 21:36:54.385783+00	
00000000-0000-0000-0000-000000000000	53566554-0d4c-4ad6-9437-c037ad130a79	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 21:48:42.100985+00	
00000000-0000-0000-0000-000000000000	8b80314a-46c8-43eb-b292-524b2e43b8cb	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 21:48:42.102608+00	
00000000-0000-0000-0000-000000000000	520c2c50-44e8-4a9f-b0a3-210889eb3099	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 21:55:16.006831+00	
00000000-0000-0000-0000-000000000000	31f34a8d-d562-4edd-ab6e-58c5706ef194	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 22:01:44.292936+00	
00000000-0000-0000-0000-000000000000	76cef5e5-8a92-483e-973e-d55d4b76b32c	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 22:05:05.014689+00	
00000000-0000-0000-0000-000000000000	8d9a9bb8-a275-4c3d-898b-10fefe7d69be	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 22:06:01.605318+00	
00000000-0000-0000-0000-000000000000	89332ea2-c0e3-4da0-a243-de938428c283	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 22:10:51.236709+00	
00000000-0000-0000-0000-000000000000	bf7d1cde-0719-4697-92cc-7745c54edf6c	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 22:12:43.392832+00	
00000000-0000-0000-0000-000000000000	3de2652b-ec17-4946-8c34-f6fc4a9c7106	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 22:21:23.967018+00	
00000000-0000-0000-0000-000000000000	4638a7ee-1c2e-4142-a43c-f2c3c979d22a	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 22:21:31.482352+00	
00000000-0000-0000-0000-000000000000	9a4bab94-1006-41c4-a880-4972c2e4e07c	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-10 22:21:31.48307+00	
00000000-0000-0000-0000-000000000000	d9f1df46-05da-4b1c-a9bd-5527d48bbf19	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 22:51:54.052924+00	
00000000-0000-0000-0000-000000000000	9a06a291-e6e8-4748-b704-a052f2e447bd	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 22:51:54.062084+00	
00000000-0000-0000-0000-000000000000	ae41a7a6-f0dc-429f-b89b-d759f1ab20a6	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"amogus@a.com","user_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","user_phone":""}}	2025-04-10 23:00:20.352504+00	
00000000-0000-0000-0000-000000000000	cfa0b563-60c4-4dd5-8172-77d3c23ea03c	{"action":"login","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-10 23:00:47.560542+00	
00000000-0000-0000-0000-000000000000	8f033522-b951-437b-8eab-b6de5a8013d4	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 00:02:50.654019+00	
00000000-0000-0000-0000-000000000000	b05468c1-7f5a-4eae-a207-93671fdc9cce	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 00:02:50.65907+00	
00000000-0000-0000-0000-000000000000	17a7b807-ffa3-4b43-9d08-989e6096843b	{"action":"token_refreshed","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 00:22:29.700855+00	
00000000-0000-0000-0000-000000000000	c0b1a377-94aa-4b45-8e36-362ae9ea941e	{"action":"token_revoked","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 00:22:29.704758+00	
00000000-0000-0000-0000-000000000000	3ee04b8c-4e30-49b8-a533-8c3ccf4283a0	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 00:49:58.752717+00	
00000000-0000-0000-0000-000000000000	2650bd25-0258-43dd-8855-d87c092aa00c	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 00:49:58.755402+00	
00000000-0000-0000-0000-000000000000	9de0c941-8863-4387-8343-4eb079f642ff	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 04:17:53.920698+00	
00000000-0000-0000-0000-000000000000	83167366-d5a1-44eb-8277-1f3c74c11626	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 04:17:53.928112+00	
00000000-0000-0000-0000-000000000000	ed3fb0fb-b944-454d-b4b3-3bad8deca239	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 05:15:53.588716+00	
00000000-0000-0000-0000-000000000000	0458e2ab-993b-4795-ae55-3d8050606c7b	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 05:15:53.592623+00	
00000000-0000-0000-0000-000000000000	71471ed5-2ff7-4d0a-b2a2-59631b5c745a	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 06:14:21.199085+00	
00000000-0000-0000-0000-000000000000	2edb9581-0738-4798-917d-b4087fcd5df8	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 06:14:21.209662+00	
00000000-0000-0000-0000-000000000000	59c4f1ff-ebcc-460a-b770-745b6e08f3b9	{"action":"token_refreshed","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 06:40:31.478977+00	
00000000-0000-0000-0000-000000000000	1d1f900b-d577-49c2-9d3c-759a4bfc845c	{"action":"token_revoked","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 06:40:31.489275+00	
00000000-0000-0000-0000-000000000000	117c354c-6e69-4a10-8257-0ee2e3edd7d8	{"action":"token_refreshed","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 19:06:10.588787+00	
00000000-0000-0000-0000-000000000000	80e45a6f-360e-467b-8885-86098e33b9fa	{"action":"token_revoked","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 19:06:10.609554+00	
00000000-0000-0000-0000-000000000000	8f6ece6f-cccc-4bed-adce-40ad4c68f5ec	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 19:51:38.99619+00	
00000000-0000-0000-0000-000000000000	7bc16638-d0d4-4e04-8dc3-8050f20a38c5	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 19:51:39.000241+00	
00000000-0000-0000-0000-000000000000	68a780af-2e6b-41d4-9d91-5883d09369f1	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 19:58:25.227673+00	
00000000-0000-0000-0000-000000000000	8e00c0aa-c52b-437e-87c8-fb39a1d0efcd	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 19:58:25.230049+00	
00000000-0000-0000-0000-000000000000	f0caa8b4-3e0f-41ef-8c2e-49c8aeb75942	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-11 20:01:00.004018+00	
00000000-0000-0000-0000-000000000000	800c53fb-78d0-42d8-b19a-c3c4eaab5092	{"action":"token_refreshed","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 20:10:19.676309+00	
00000000-0000-0000-0000-000000000000	f47e3673-2265-4c19-a622-df06bcfa71fb	{"action":"token_revoked","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 20:10:19.678947+00	
00000000-0000-0000-0000-000000000000	46fe1099-ca34-43e5-a9b2-d1128d815b72	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-11 20:14:53.262916+00	
00000000-0000-0000-0000-000000000000	5212c8bc-e63b-413e-8443-4bdd93fa7686	{"action":"user_signedup","actor_id":"b5d11271-9904-408a-b5ee-ae67ebda0586","actor_username":"empleado@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-11 20:43:47.41478+00	
00000000-0000-0000-0000-000000000000	b412f307-a67d-45f5-a447-a56f24f53f85	{"action":"login","actor_id":"b5d11271-9904-408a-b5ee-ae67ebda0586","actor_username":"empleado@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-11 20:43:47.421379+00	
00000000-0000-0000-0000-000000000000	3aa1d19a-907d-47e8-a8ad-b02b6bbd39bb	{"action":"token_refreshed","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 21:20:28.453485+00	
00000000-0000-0000-0000-000000000000	9d19523e-96b3-42fc-bd51-1bc3b678dd2d	{"action":"token_revoked","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 21:20:28.455679+00	
00000000-0000-0000-0000-000000000000	8a78ba92-98f9-4f6d-856e-e7c9eeadaaae	{"action":"token_refreshed","actor_id":"b5d11271-9904-408a-b5ee-ae67ebda0586","actor_username":"empleado@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 21:42:04.548812+00	
00000000-0000-0000-0000-000000000000	30922310-20a1-43f5-adfc-e3d5c6712154	{"action":"token_revoked","actor_id":"b5d11271-9904-408a-b5ee-ae67ebda0586","actor_username":"empleado@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 21:42:04.551774+00	
00000000-0000-0000-0000-000000000000	c4d34ccd-15fd-4d55-96f6-e2e3af2d5f08	{"action":"login","actor_id":"b5d11271-9904-408a-b5ee-ae67ebda0586","actor_username":"empleado@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-11 21:46:42.548217+00	
00000000-0000-0000-0000-000000000000	55db8b73-25cb-4c77-bf51-7127624c3c60	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-11 21:54:35.539628+00	
00000000-0000-0000-0000-000000000000	c53c2539-69c6-4a37-a278-b2ce16b49341	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 21:57:49.370066+00	
00000000-0000-0000-0000-000000000000	e0f08d03-0c80-4dd8-9c56-5b224797c136	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 21:57:49.372916+00	
00000000-0000-0000-0000-000000000000	ae72ec1f-7723-45a3-844b-5dce2c3416cb	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-11 22:02:00.374335+00	
00000000-0000-0000-0000-000000000000	d013764e-0e4f-4026-9f4e-d80997314195	{"action":"login","actor_id":"b5d11271-9904-408a-b5ee-ae67ebda0586","actor_username":"empleado@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-11 22:07:31.73277+00	
00000000-0000-0000-0000-000000000000	3eded489-3a0c-4592-83b9-6b42874c9b6a	{"action":"token_refreshed","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 22:20:02.165841+00	
00000000-0000-0000-0000-000000000000	2eb801c7-7deb-46e7-a18c-c2e159e1c195	{"action":"token_revoked","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 22:20:02.166855+00	
00000000-0000-0000-0000-000000000000	19884c03-b9f5-4fc5-af42-0052b92dc0bd	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 22:55:59.573282+00	
00000000-0000-0000-0000-000000000000	7924e7e8-5292-4ddf-bd7a-59372affb6f9	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 22:55:59.577892+00	
00000000-0000-0000-0000-000000000000	a59cfbb0-5e05-4c46-b38a-8c9b3f1d904a	{"action":"token_refreshed","actor_id":"b5d11271-9904-408a-b5ee-ae67ebda0586","actor_username":"empleado@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 23:05:56.144245+00	
00000000-0000-0000-0000-000000000000	1b824d81-389e-453d-8beb-37b99900c290	{"action":"token_revoked","actor_id":"b5d11271-9904-408a-b5ee-ae67ebda0586","actor_username":"empleado@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 23:05:56.146937+00	
00000000-0000-0000-0000-000000000000	20ae992e-5d4d-4f61-a273-19c688d153a1	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 23:20:05.374629+00	
00000000-0000-0000-0000-000000000000	124c194e-29a1-4c4f-8870-7f431e76f36f	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 23:20:05.376811+00	
00000000-0000-0000-0000-000000000000	10911041-a0ab-486e-93a4-330c78c01ea0	{"action":"token_refreshed","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 23:20:13.865853+00	
00000000-0000-0000-0000-000000000000	33847b63-4488-44dd-b74b-c7f5a6bfc460	{"action":"token_revoked","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-11 23:20:13.86658+00	
00000000-0000-0000-0000-000000000000	6f9c25cb-ac3b-43f9-9714-0ad78e2fd87e	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-11 23:45:22.637008+00	
00000000-0000-0000-0000-000000000000	93246f5e-1058-43d8-ab70-2579d0fc31f7	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-11 23:47:04.704454+00	
00000000-0000-0000-0000-000000000000	c332b066-6cf5-43d1-81fa-0c0c8af7541e	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 23:56:48.972569+00	
00000000-0000-0000-0000-000000000000	ab8a059a-8982-4d6e-9bb2-88586c79c065	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-11 23:56:48.974876+00	
00000000-0000-0000-0000-000000000000	341b41ea-c3ed-44fa-b85c-75da35114ae3	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-12 02:29:48.962942+00	
00000000-0000-0000-0000-000000000000	880fddff-53e4-4b96-b900-08e642ba47cf	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-12 02:29:48.965657+00	
00000000-0000-0000-0000-000000000000	af030ec3-15aa-44cf-b570-619d1013ad4d	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-12 03:28:15.280919+00	
00000000-0000-0000-0000-000000000000	243e7f72-772f-43a5-add7-9329269dfb71	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-12 03:28:15.282433+00	
00000000-0000-0000-0000-000000000000	d27ace69-0144-4cfc-95f8-8e6f98964fd8	{"action":"token_refreshed","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-12 22:12:49.236676+00	
00000000-0000-0000-0000-000000000000	492f52c7-a25c-47d2-9845-c93be790e0ff	{"action":"token_revoked","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-12 22:12:49.253144+00	
00000000-0000-0000-0000-000000000000	b3a874c4-0151-464a-bf2a-d7b7d2bd518a	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 04:56:47.82425+00	
00000000-0000-0000-0000-000000000000	153cd585-4e54-441d-a013-b6d8720a3adb	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 04:56:47.842528+00	
00000000-0000-0000-0000-000000000000	44bd7431-4237-4d1d-a2b6-9082337421c6	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-13 04:57:51.54211+00	
00000000-0000-0000-0000-000000000000	9ade85b7-82d0-4a45-b92f-07f7836cd124	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-13 04:57:53.335693+00	
00000000-0000-0000-0000-000000000000	cb3ac817-de51-4a63-97a5-eaaa9d23f664	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 06:57:52.057735+00	
00000000-0000-0000-0000-000000000000	760c30f2-3513-4966-a3c6-ca106a64abc0	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 06:57:52.073533+00	
00000000-0000-0000-0000-000000000000	81f5a0df-628d-4a15-a926-96fa7ad38249	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 07:55:52.682425+00	
00000000-0000-0000-0000-000000000000	3d367620-9aec-43db-80a8-0321ca4638b6	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 07:55:52.689554+00	
00000000-0000-0000-0000-000000000000	8ebfc053-68c5-45fe-8995-093ba81bde63	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 20:11:39.117457+00	
00000000-0000-0000-0000-000000000000	644382fe-4183-476c-89ee-e1d0afaf18ae	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 20:11:39.150495+00	
00000000-0000-0000-0000-000000000000	4f824aaa-5b88-48ac-b22b-22613ba6321b	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 21:09:42.608915+00	
00000000-0000-0000-0000-000000000000	9626e3fe-0008-4fde-b6fe-5570bcc3ff62	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-13 21:09:42.616647+00	
00000000-0000-0000-0000-000000000000	37c42d74-3cb2-47a4-aabe-aeaf24ffdd98	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-16 06:25:27.130701+00	
00000000-0000-0000-0000-000000000000	2c1e7ed6-e79c-49d6-bf4d-135a1fc33e94	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-16 06:25:27.147696+00	
00000000-0000-0000-0000-000000000000	fbb9cecc-3962-4509-9ad3-ed925539d465	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-16 06:25:46.314147+00	
00000000-0000-0000-0000-000000000000	9d96ba75-b79f-4096-9c9f-dccaca8a07fb	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-16 22:27:24.127852+00	
00000000-0000-0000-0000-000000000000	4411edf8-3bf2-43a8-ae53-724007dae800	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-16 22:27:24.136951+00	
00000000-0000-0000-0000-000000000000	b0fab9ae-1167-4ced-ae04-824af343560e	{"action":"token_refreshed","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-21 04:17:12.361305+00	
00000000-0000-0000-0000-000000000000	fc55142a-894b-4059-a3e4-ad23b848d4af	{"action":"token_revoked","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-21 04:17:12.378029+00	
00000000-0000-0000-0000-000000000000	766f70eb-5181-48b6-ae1d-163748178433	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-21 19:34:36.477806+00	
00000000-0000-0000-0000-000000000000	f9bb2ca1-7704-42ea-913e-199ee8a4f376	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-21 19:34:36.503797+00	
00000000-0000-0000-0000-000000000000	b25098da-8c4c-4bc6-917e-63e21005da9e	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 04:02:04.162616+00	
00000000-0000-0000-0000-000000000000	905a61d1-eff5-4d45-a498-7c9d2c66fccc	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 04:02:04.186472+00	
00000000-0000-0000-0000-000000000000	7b9c3281-8529-40f3-a6c2-f7965ef35295	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 04:02:08.915238+00	
00000000-0000-0000-0000-000000000000	e47d9e99-b34e-4285-b2e8-306ec6b26618	{"action":"token_refreshed","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 19:53:18.636194+00	
00000000-0000-0000-0000-000000000000	2e8b6cda-07da-4cd6-b89b-afeb281e0d44	{"action":"token_revoked","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 19:53:18.652667+00	
00000000-0000-0000-0000-000000000000	ad9b5280-4383-4f29-bd02-4ee171678dc5	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 20:07:37.107845+00	
00000000-0000-0000-0000-000000000000	d873db06-f323-4565-b4c2-1f174c4e659e	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 20:11:14.049603+00	
00000000-0000-0000-0000-000000000000	57c769fc-3d33-4914-b0f2-afa5120fe04e	{"action":"token_refreshed","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 21:28:10.290946+00	
00000000-0000-0000-0000-000000000000	a77e0384-a975-4a3e-b4f1-38b41d333ead	{"action":"token_revoked","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 21:28:10.293793+00	
00000000-0000-0000-0000-000000000000	50bb9b1e-8b22-4d22-be66-12d2495fb3a2	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-22 21:41:05.753987+00	
00000000-0000-0000-0000-000000000000	3c6e7aa1-1401-43b9-a52e-850faa37681e	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-22 21:41:05.757285+00	
00000000-0000-0000-0000-000000000000	c2138d85-2eea-464e-a47c-aa592bfae4fa	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 21:41:07.906918+00	
00000000-0000-0000-0000-000000000000	5cd3fee8-ceda-46d9-a8de-5b160661367c	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 21:41:09.295158+00	
00000000-0000-0000-0000-000000000000	82e44e85-73b6-4d53-b7e8-95bea86fb6d6	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-22 21:42:54.25999+00	
00000000-0000-0000-0000-000000000000	7ed368c4-9c85-46d7-b68c-eba96bf6f660	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-22 21:42:54.26217+00	
00000000-0000-0000-0000-000000000000	76e1f493-3ef5-4a30-97a5-93333f36623e	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 21:48:45.651226+00	
00000000-0000-0000-0000-000000000000	eabe8136-5df7-4b1b-a2aa-fc826d29011c	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 21:48:45.653906+00	
00000000-0000-0000-0000-000000000000	c7be994c-ab5d-4233-9218-dbb4dc468745	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 21:56:59.685449+00	
00000000-0000-0000-0000-000000000000	95e320e8-c617-437d-8856-bad9a08f19d4	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 21:57:01.114087+00	
00000000-0000-0000-0000-000000000000	a35ee60f-a540-475a-8276-fe747143afa9	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:01:35.840489+00	
00000000-0000-0000-0000-000000000000	fc0213ea-cf7a-487d-8c50-060b67cc0ef8	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:01:35.843654+00	
00000000-0000-0000-0000-000000000000	3e521bc6-f82d-4ec2-b451-733062ccab74	{"action":"login","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 22:01:37.736282+00	
00000000-0000-0000-0000-000000000000	bde990bb-c207-4016-9deb-0923422b31a6	{"action":"token_refreshed","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:23:23.429303+00	
00000000-0000-0000-0000-000000000000	a9f9e577-6f3a-406f-9d0b-1046318b7bd9	{"action":"token_revoked","actor_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","actor_username":"amogus@a.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:23:23.43437+00	
00000000-0000-0000-0000-000000000000	594bbd5f-bffd-43f5-91e9-5b3ab6432cfe	{"action":"token_refreshed","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:38:05.305394+00	
00000000-0000-0000-0000-000000000000	72dd0e8f-bce9-485d-ba6a-11b9a0ceda8e	{"action":"token_revoked","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:38:05.309682+00	
00000000-0000-0000-0000-000000000000	179cb835-c157-4dbf-9a77-9c055bad6978	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:41:35.732449+00	
00000000-0000-0000-0000-000000000000	cb332126-4e8a-49d6-9994-d01282f76c37	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:41:35.734555+00	
00000000-0000-0000-0000-000000000000	3821ce34-ba3d-4940-96c7-b2c8a45bbc00	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:46:47.141861+00	
00000000-0000-0000-0000-000000000000	e80c7ab3-f6d3-4818-9bbc-2afd6d83c031	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 22:46:47.143592+00	
00000000-0000-0000-0000-000000000000	114482c0-accd-4e71-b3c7-1af75baa9175	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 22:53:20.909601+00	
00000000-0000-0000-0000-000000000000	dffa2608-f3d5-4e36-acf2-7a481f079915	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 22:53:50.441338+00	
00000000-0000-0000-0000-000000000000	6a0fbe5b-afdf-42bf-9534-6fd7dfde8bab	{"action":"user_repeated_signup","actor_id":"5314bfcf-8401-457f-b7a7-2221ea64777c","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-22 23:00:09.383666+00	
00000000-0000-0000-0000-000000000000	3590bca4-5f2c-4075-984e-5247659f3028	{"action":"user_repeated_signup","actor_id":"5314bfcf-8401-457f-b7a7-2221ea64777c","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-22 23:00:16.814101+00	
00000000-0000-0000-0000-000000000000	39fd88cc-b6de-48bb-97ee-a8ffc469d6f3	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01198327@tec.mx","user_id":"5314bfcf-8401-457f-b7a7-2221ea64777c","user_phone":""}}	2025-04-22 23:03:15.661773+00	
00000000-0000-0000-0000-000000000000	19db4dd6-3dbe-4697-99c5-b10cd4f4a29f	{"action":"user_signedup","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-22 23:07:34.3606+00	
00000000-0000-0000-0000-000000000000	3e75eed3-577b-441d-898a-c4001e9c31c3	{"action":"login","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 23:07:34.367148+00	
00000000-0000-0000-0000-000000000000	be54549a-f807-4e8d-9c2b-0761f3710645	{"action":"login","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-22 23:09:11.304957+00	
00000000-0000-0000-0000-000000000000	17d431fe-1e8d-4d76-9ac2-89aac6e05eab	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-22 23:13:16.851186+00	
00000000-0000-0000-0000-000000000000	883792f0-370c-4b3f-b4d5-ca351df3ffd2	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-22 23:13:16.853788+00	
00000000-0000-0000-0000-000000000000	e14be48c-afd7-4386-a0cf-e2f12860c0e0	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-23 04:50:16.156904+00	
00000000-0000-0000-0000-000000000000	0f4a8053-e796-4512-8901-a1a4f6baae47	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-23 04:50:16.16497+00	
00000000-0000-0000-0000-000000000000	8588507e-1a75-4008-b2e8-a66c19ec2b28	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-23 18:08:46.883974+00	
00000000-0000-0000-0000-000000000000	e30e464a-8a88-49b1-b164-6b8a46f3a0f0	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-23 18:08:46.904648+00	
00000000-0000-0000-0000-000000000000	b4c18760-f175-439a-badf-7f0b3a9df6e6	{"action":"token_refreshed","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 18:09:03.381283+00	
00000000-0000-0000-0000-000000000000	e586eb88-9806-4e42-903c-89717427b622	{"action":"token_revoked","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 18:09:03.381925+00	
00000000-0000-0000-0000-000000000000	9eefcfad-6de8-4652-8214-0bd7194f8ad2	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-23 18:10:26.966973+00	
00000000-0000-0000-0000-000000000000	366e64b2-a113-43ac-a40d-de85c460e69a	{"action":"user_signedup","actor_id":"7ff2a62c-ef30-4c1e-8465-57ada3bb6897","actor_username":"liz@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-23 18:12:12.210045+00	
00000000-0000-0000-0000-000000000000	fff6111b-354c-408d-bb79-f49831ce61b3	{"action":"login","actor_id":"7ff2a62c-ef30-4c1e-8465-57ada3bb6897","actor_username":"liz@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-23 18:12:12.220153+00	
00000000-0000-0000-0000-000000000000	9a81354a-de7c-4d8a-9a06-37985abe261e	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-23 18:27:29.004797+00	
00000000-0000-0000-0000-000000000000	1f2fd3ef-e9c8-4989-8ab5-8dd07c0f5a96	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 18:43:38.444279+00	
00000000-0000-0000-0000-000000000000	83ef73c5-0488-464b-ad65-26fdc45abae8	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 18:43:38.44868+00	
00000000-0000-0000-0000-000000000000	f36e3c2a-1c08-495f-b1b7-4fef7a08e498	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 19:42:16.628126+00	
00000000-0000-0000-0000-000000000000	1ace399e-d3c2-44e5-9921-bfd58bfa7675	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 19:42:16.633252+00	
00000000-0000-0000-0000-000000000000	095b589e-41eb-494a-a1e4-2f46c4d7eda2	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 02:44:55.827234+00	
00000000-0000-0000-0000-000000000000	01e4c633-6b0f-465b-9363-dda8fb2ed153	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 02:44:55.843943+00	
00000000-0000-0000-0000-000000000000	0424afd1-e54e-4ffa-bfe4-0f8db628225d	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 03:47:32.756797+00	
00000000-0000-0000-0000-000000000000	ead550d8-7bab-4da7-9216-46b157d281c6	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 03:47:32.76107+00	
00000000-0000-0000-0000-000000000000	486d28fb-96e8-4ae6-8a19-b4438eeffce7	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 05:21:26.612951+00	
00000000-0000-0000-0000-000000000000	61feb827-e44f-4f94-8eb3-37b6d6601511	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 05:21:26.615491+00	
00000000-0000-0000-0000-000000000000	2fee7240-0187-472b-9d13-a7aff82de244	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 05:34:29.347396+00	
00000000-0000-0000-0000-000000000000	b583c1a6-9c9e-456b-be73-343b30c58b44	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 05:34:29.351348+00	
00000000-0000-0000-0000-000000000000	ce129959-cddb-49f6-be9d-189c15398784	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 06:22:45.231357+00	
00000000-0000-0000-0000-000000000000	c6572348-f05e-49ad-96a8-ad676e279dd5	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 06:22:45.234142+00	
00000000-0000-0000-0000-000000000000	ed40cdcf-34bf-40bc-b0a3-4d0dbb54ad21	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 07:24:01.473968+00	
00000000-0000-0000-0000-000000000000	1d24477a-07fd-4e4d-b06b-63f09ef8294b	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 07:24:01.487637+00	
00000000-0000-0000-0000-000000000000	3b5a8bab-df22-4f5f-8fcb-0af3f81aa92b	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 08:27:07.258989+00	
00000000-0000-0000-0000-000000000000	47ad4f92-a3a8-4e80-9cf5-9cbd5d360fbc	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 08:27:07.267816+00	
00000000-0000-0000-0000-000000000000	3b4d33c0-dc9c-47a7-bf88-044e0d3a395a	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 09:25:07.33425+00	
00000000-0000-0000-0000-000000000000	15b2f6a8-633f-418e-ae97-02ffa5b4a6b0	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 09:25:07.3442+00	
00000000-0000-0000-0000-000000000000	8243970a-b7a2-4f12-95ac-00f4b63fcd09	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 10:38:14.732043+00	
00000000-0000-0000-0000-000000000000	f7351238-c31e-496e-8dbf-55778e0f8243	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 10:38:14.742663+00	
00000000-0000-0000-0000-000000000000	74ad04bf-62ee-4de0-9029-9bbbfcad9dc5	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 11:36:20.814337+00	
00000000-0000-0000-0000-000000000000	e2330dab-0668-4177-ab8d-ca3470f8d687	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 11:36:20.818616+00	
00000000-0000-0000-0000-000000000000	bac0c56a-f3b3-44f6-802e-012af2e3af51	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 17:52:32.975462+00	
00000000-0000-0000-0000-000000000000	0e23a6db-10cd-4b2d-a404-f98d64718bc5	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 17:52:32.990534+00	
00000000-0000-0000-0000-000000000000	26548a6e-69b4-4a5a-aceb-df36a0674f36	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:06:56.562084+00	
00000000-0000-0000-0000-000000000000	f8ce0826-61a8-42b9-b513-85f1e26c813c	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:06:56.569198+00	
00000000-0000-0000-0000-000000000000	9401fd83-5551-42a2-bbbe-1f6d8ea274bc	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:09:21.635887+00	
00000000-0000-0000-0000-000000000000	36d4305a-4ea1-4729-88ee-1e7950ee6259	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:09:21.63723+00	
00000000-0000-0000-0000-000000000000	d6540a37-7e56-4883-811e-ddea8ada4129	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:23:55.814277+00	
00000000-0000-0000-0000-000000000000	d309e685-f163-490c-a562-d1b69ee225dd	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:23:55.818465+00	
00000000-0000-0000-0000-000000000000	8d6aa12d-a587-45d3-9729-5d4c0e274ff5	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:25:06.640574+00	
00000000-0000-0000-0000-000000000000	45e04bfb-5773-4864-8dc7-910e22a462d9	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:25:06.641466+00	
00000000-0000-0000-0000-000000000000	836d66e3-f1c3-41bf-a2ec-dbd1fd4a2403	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:25:42.584144+00	
00000000-0000-0000-0000-000000000000	b7dd3782-4ab5-4a0e-8ffc-d3d0bc5bf301	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:25:42.584904+00	
00000000-0000-0000-0000-000000000000	99f0872a-eb36-481c-b64d-87c146f852f7	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-24 19:27:19.787894+00	
00000000-0000-0000-0000-000000000000	1b8d2ab6-6e9e-4c96-b971-9cde52299872	{"action":"login","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-24 19:37:24.542223+00	
00000000-0000-0000-0000-000000000000	372aec16-d5f8-4de4-9c84-3ccedbaa71f3	{"action":"login","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-24 19:40:02.634806+00	
00000000-0000-0000-0000-000000000000	fd1cbeae-6b34-40d1-9471-bc4dd69ddbce	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:57:12.64085+00	
00000000-0000-0000-0000-000000000000	2fcbcd4a-b0e8-455e-9199-2f47eb71c5e2	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 19:57:12.643698+00	
00000000-0000-0000-0000-000000000000	d0680990-062d-496d-b17c-8584f5b45f95	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-24 19:57:17.481828+00	
00000000-0000-0000-0000-000000000000	dd603491-6ba4-4b01-b49e-15a889afd6e5	{"action":"token_refreshed","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:00:55.992524+00	
00000000-0000-0000-0000-000000000000	86ad0790-2c19-4311-93b7-2331e6b16c07	{"action":"token_revoked","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:00:55.9944+00	
00000000-0000-0000-0000-000000000000	156a9994-1739-487e-abf5-848edde2d419	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-24 20:07:32.256665+00	
00000000-0000-0000-0000-000000000000	b9aadfc7-88b0-4144-a6db-4097d98885c1	{"action":"user_signedup","actor_id":"ef15530b-dd57-4e43-a6ab-a04aa7b3a979","actor_username":"caso@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-24 20:08:51.675542+00	
00000000-0000-0000-0000-000000000000	b5517c6e-0415-4636-9ec0-f4e3309747b1	{"action":"login","actor_id":"ef15530b-dd57-4e43-a6ab-a04aa7b3a979","actor_username":"caso@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-24 20:08:51.683731+00	
00000000-0000-0000-0000-000000000000	2066abfd-df1d-430d-b1dc-16d59fe803de	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:24:28.950539+00	
00000000-0000-0000-0000-000000000000	81ee845d-cb83-4bcc-9419-73142db9d644	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:24:28.952939+00	
00000000-0000-0000-0000-000000000000	2151022b-da6e-464e-8d0a-566639d25ba8	{"action":"login","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-24 20:25:30.069727+00	
00000000-0000-0000-0000-000000000000	f36e58f0-b036-4ee6-ad79-d1c2d103b4bc	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:27:01.376149+00	
00000000-0000-0000-0000-000000000000	839cb3f1-666c-4191-87d5-2094b46dbe98	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:27:01.378326+00	
00000000-0000-0000-0000-000000000000	0610d6f9-0897-430a-89d1-586398f2f0c2	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:35:32.439199+00	
00000000-0000-0000-0000-000000000000	a563faf1-496b-492b-8552-98cf78ebc354	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:35:32.443002+00	
00000000-0000-0000-0000-000000000000	e8f786f1-890b-4551-8111-fe34f091abc8	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:55:28.372735+00	
00000000-0000-0000-0000-000000000000	29efc931-6661-4a7a-b68f-d0121ddf17f0	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:55:28.375054+00	
00000000-0000-0000-0000-000000000000	a8620baf-0a29-4895-a953-28099d1440e7	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:55:56.223881+00	
00000000-0000-0000-0000-000000000000	3772ee8a-00da-4eee-b9d8-6f05a10ca0c5	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 20:55:56.225212+00	
00000000-0000-0000-0000-000000000000	92713652-8d1a-4909-a9f7-42c3ce705ca9	{"action":"token_refreshed","actor_id":"ef15530b-dd57-4e43-a6ab-a04aa7b3a979","actor_username":"caso@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:14:28.032871+00	
00000000-0000-0000-0000-000000000000	1e62a27c-0256-4d6c-952d-b47d17129f41	{"action":"token_revoked","actor_id":"ef15530b-dd57-4e43-a6ab-a04aa7b3a979","actor_username":"caso@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:14:28.038505+00	
00000000-0000-0000-0000-000000000000	a0bf22bc-b501-4a91-8034-b1b30765c347	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:26:27.705037+00	
00000000-0000-0000-0000-000000000000	f7bfe10c-21f5-46e3-8ada-544d8132c9e8	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:26:27.708075+00	
00000000-0000-0000-0000-000000000000	7435c8f2-1293-4e08-b256-a17750460fbe	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:26:35.982625+00	
00000000-0000-0000-0000-000000000000	33e0e235-fb1e-424a-aa8a-d1a8eec8bedc	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:26:35.983281+00	
00000000-0000-0000-0000-000000000000	c43a7cac-7ccb-464e-bbe2-e3b2df822a12	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:39:13.917148+00	
00000000-0000-0000-0000-000000000000	4f4eb7d3-3436-4c87-8c55-aaa4a04da657	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:39:13.920148+00	
00000000-0000-0000-0000-000000000000	de83342f-c62c-4b53-80f3-d79610c9e296	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:54:02.907185+00	
00000000-0000-0000-0000-000000000000	94759039-75da-4ce9-868c-19c003eedb1a	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:54:02.910282+00	
00000000-0000-0000-0000-000000000000	1a0892c5-6b89-4a2d-9e83-405ebd712757	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:59:55.639825+00	
00000000-0000-0000-0000-000000000000	d08780b7-a112-46c3-ab1e-bd490ed69a7f	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 21:59:55.643375+00	
00000000-0000-0000-0000-000000000000	82d80a4f-e6fc-4bc9-93f4-2681b1e09049	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:00:10.665421+00	
00000000-0000-0000-0000-000000000000	55235a30-3468-4272-bf4b-adfa522d3ff2	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:00:10.668445+00	
00000000-0000-0000-0000-000000000000	64244a73-da1e-4d2a-94e8-76c2c237faea	{"action":"login","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-24 22:00:20.493753+00	
00000000-0000-0000-0000-000000000000	fc31ed71-74fc-4049-b605-b8238d397ee4	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:24:42.106331+00	
00000000-0000-0000-0000-000000000000	4a742175-f442-4a0b-a85f-96d9dd611bf9	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:24:42.108462+00	
00000000-0000-0000-0000-000000000000	a1cda13c-0816-450e-af91-190a16b5b1a5	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:25:57.945647+00	
00000000-0000-0000-0000-000000000000	7078e9fa-c4bd-4aaf-8975-3eeda7038da0	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:25:57.94882+00	
00000000-0000-0000-0000-000000000000	c1c9ddbf-b742-45e5-b716-b095360b5b80	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:38:29.686842+00	
00000000-0000-0000-0000-000000000000	8232ab63-b41e-488a-b8d8-43835ecc5251	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:38:29.689942+00	
00000000-0000-0000-0000-000000000000	b9a4fbf2-97b3-4a90-a5ee-9cc52acfa7a6	{"action":"token_refreshed","actor_id":"ef15530b-dd57-4e43-a6ab-a04aa7b3a979","actor_username":"caso@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:43:09.193439+00	
00000000-0000-0000-0000-000000000000	be5a1a15-0787-4277-bfa6-04f79d59b33b	{"action":"token_revoked","actor_id":"ef15530b-dd57-4e43-a6ab-a04aa7b3a979","actor_username":"caso@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:43:09.196769+00	
00000000-0000-0000-0000-000000000000	d0b7f0e7-c04d-4ef0-ac6a-ce4fc1f3799f	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:52:25.869288+00	
00000000-0000-0000-0000-000000000000	20cbaf85-f319-443a-afb2-dd4425761907	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:52:25.872567+00	
00000000-0000-0000-0000-000000000000	4d41fb4c-0e01-4e96-9aea-b2315922a6b3	{"action":"login","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-24 22:52:26.654888+00	
00000000-0000-0000-0000-000000000000	aeef39e4-d906-4d21-ae0e-99f78da1013b	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:59:07.313249+00	
00000000-0000-0000-0000-000000000000	33538444-e3a9-4b73-b33b-d8451426a4ec	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 22:59:07.314723+00	
00000000-0000-0000-0000-000000000000	0fef9454-1c69-41dd-ad32-be7f3c6da58b	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 23:23:33.644178+00	
00000000-0000-0000-0000-000000000000	6ed4642e-4bc9-4674-8327-1cf1af25bfc3	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 23:23:33.650777+00	
00000000-0000-0000-0000-000000000000	ee708d8f-e001-48ef-b551-14608655ae51	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 23:24:34.135415+00	
00000000-0000-0000-0000-000000000000	52e4fab2-0639-4c62-a703-230fc7aa95db	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-24 23:24:34.136524+00	
00000000-0000-0000-0000-000000000000	789f5cc6-2faf-47ec-bb3a-604a5052ed35	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 23:57:22.36699+00	
00000000-0000-0000-0000-000000000000	925ad725-ee93-4cce-9292-bc0523b6411d	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-24 23:57:22.375414+00	
00000000-0000-0000-0000-000000000000	053b4dea-4ce8-4fd9-8be9-01939467fedc	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 00:05:37.132227+00	
00000000-0000-0000-0000-000000000000	2a45163f-ba3f-477e-927c-b935a82f0bee	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 00:05:37.137213+00	
00000000-0000-0000-0000-000000000000	31938d22-833f-4b02-982a-f4a612eabeb4	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 00:22:02.287321+00	
00000000-0000-0000-0000-000000000000	10d4c25c-2f50-4987-9b32-9d0039a53350	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 00:22:02.289922+00	
00000000-0000-0000-0000-000000000000	8e896570-27cb-42c2-952c-df3a45bbceb1	{"action":"token_refreshed","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 00:24:17.625179+00	
00000000-0000-0000-0000-000000000000	93f0ccfb-649c-46ba-9fa9-2faa5f548f18	{"action":"token_revoked","actor_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","actor_username":"a01198676@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 00:24:17.626675+00	
00000000-0000-0000-0000-000000000000	c618ee47-e57f-4b60-a6b7-d2da144b82aa	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 00:24:44.162456+00	
00000000-0000-0000-0000-000000000000	42cf0dec-f803-4c16-89b7-5bbe5395dcb3	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 00:24:44.163228+00	
00000000-0000-0000-0000-000000000000	1499eb06-8b57-46f0-a22c-1243fef0404e	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 02:34:45.441792+00	
00000000-0000-0000-0000-000000000000	b531b6d8-11c9-48ee-afee-c564fe9d5024	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 02:34:45.450316+00	
00000000-0000-0000-0000-000000000000	559ef78d-4a83-497e-828f-716a0da10f8e	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:08:37.254176+00	
00000000-0000-0000-0000-000000000000	99b9395a-4fb8-4a98-8503-4bff966f509a	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:08:37.257637+00	
00000000-0000-0000-0000-000000000000	1acc3fe7-8299-48d0-b84d-75f1b56a8d1f	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:24:30.686695+00	
00000000-0000-0000-0000-000000000000	eb9f1894-af6d-48cd-be16-65f95bc6a9b3	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:24:30.688576+00	
00000000-0000-0000-0000-000000000000	395d2d17-0f83-451c-982b-927b1b162a06	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:30:26.409114+00	
00000000-0000-0000-0000-000000000000	7a970b88-32e5-4972-adfe-0756f328c455	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:30:26.412085+00	
00000000-0000-0000-0000-000000000000	1a8b8017-5a7e-4ac6-b99d-7222f3125942	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:30:32.007474+00	
00000000-0000-0000-0000-000000000000	0eed6a06-a646-4e60-a4ed-952b053b32fe	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:30:32.008178+00	
00000000-0000-0000-0000-000000000000	ec88ce00-4d28-4d32-9124-fc7ed003df88	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:32:51.800197+00	
00000000-0000-0000-0000-000000000000	48a9e1f5-c713-4df1-ad72-823bd507acae	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 03:32:51.801848+00	
00000000-0000-0000-0000-000000000000	93d637dd-f41c-4a17-a80f-029dd0f8dc0b	{"action":"logout","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account"}	2025-04-25 04:11:44.390661+00	
00000000-0000-0000-0000-000000000000	db559f0c-795b-4a35-a209-e54410262b99	{"action":"login","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 04:12:54.977825+00	
00000000-0000-0000-0000-000000000000	1d7e1e5c-c21e-4c9b-9f73-04d6bd9ceefe	{"action":"token_refreshed","actor_id":"ef15530b-dd57-4e43-a6ab-a04aa7b3a979","actor_username":"caso@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 04:44:24.421696+00	
00000000-0000-0000-0000-000000000000	6a0c19ca-b88b-4169-a9b5-38625c87fb45	{"action":"token_revoked","actor_id":"ef15530b-dd57-4e43-a6ab-a04aa7b3a979","actor_username":"caso@g.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 04:44:24.42756+00	
00000000-0000-0000-0000-000000000000	d6ccdba5-4a8f-475d-a6f4-5d3a14332adc	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 04:44:37.034242+00	
00000000-0000-0000-0000-000000000000	8430a19e-c977-4880-8f38-47a8df7b811a	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 04:46:47.894984+00	
00000000-0000-0000-0000-000000000000	1bd2a401-1db9-4322-8fad-55cba06d669c	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 04:46:47.897146+00	
00000000-0000-0000-0000-000000000000	f8c09bbc-f73c-4387-aaf4-052b125a72b3	{"action":"logout","actor_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","actor_username":"capability@g.com","actor_via_sso":false,"log_type":"account"}	2025-04-25 04:47:18.410612+00	
00000000-0000-0000-0000-000000000000	8adb66f4-b450-4a35-866d-49d4b095ae59	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 04:47:31.987809+00	
00000000-0000-0000-0000-000000000000	3ef20dfb-4f1c-4fcf-b3e1-49fc594b70ae	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 04:49:24.730836+00	
00000000-0000-0000-0000-000000000000	4711d09f-3675-4205-94c4-29c4d0506258	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 04:59:56.922719+00	
00000000-0000-0000-0000-000000000000	19cf6514-85f9-4816-9ca2-32eb318a2252	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 04:59:56.929543+00	
00000000-0000-0000-0000-000000000000	d5b94269-609b-4084-953b-838a6fc14a85	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 05:12:08.685161+00	
00000000-0000-0000-0000-000000000000	404f3937-8147-4443-aa75-9a1bdd1b28b1	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 05:12:08.695554+00	
00000000-0000-0000-0000-000000000000	16c58c0e-ba8a-4b87-99dc-7897ee690b0c	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 05:12:11.288139+00	
00000000-0000-0000-0000-000000000000	d46e34b0-5ff4-4e54-8305-f3f789620169	{"action":"login","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 05:12:12.06596+00	
00000000-0000-0000-0000-000000000000	2f5fabeb-4bfa-40f6-a025-16e33ab0a807	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 05:47:46.49976+00	
00000000-0000-0000-0000-000000000000	d35cf5c9-aabe-4da0-8080-11295c913722	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 05:47:46.507918+00	
00000000-0000-0000-0000-000000000000	f09e4c1b-fa7c-4ddd-bc30-aa19f725e0d2	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 06:04:09.423435+00	
00000000-0000-0000-0000-000000000000	455807ed-225b-4962-9c76-188d4cff1654	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 06:04:09.430431+00	
00000000-0000-0000-0000-000000000000	29342dcc-cd55-4278-8da6-dafa803b9bd6	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 06:11:12.922221+00	
00000000-0000-0000-0000-000000000000	955e9331-7a91-4eeb-bfa8-8fb31f0b28b6	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 06:11:12.925767+00	
00000000-0000-0000-0000-000000000000	23ae550c-4378-42da-91d3-7519d023bed0	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 06:19:12.881603+00	
00000000-0000-0000-0000-000000000000	5e2f54c1-5229-469a-9837-60a54b715c9c	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 06:19:12.883786+00	
00000000-0000-0000-0000-000000000000	5d5fe992-bc35-4442-ab82-6b45879bb8a9	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 06:52:37.320768+00	
00000000-0000-0000-0000-000000000000	18e1e61c-e6f9-4637-8ba3-99afb3319881	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 06:52:37.334367+00	
00000000-0000-0000-0000-000000000000	ae316d98-9b40-48c3-b40c-d5f3ede3f3ef	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 07:04:18.024511+00	
00000000-0000-0000-0000-000000000000	85c33563-909e-4b0a-9838-9d8eaa3a51ec	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 07:04:18.041503+00	
00000000-0000-0000-0000-000000000000	01f802b3-31e8-4c24-a724-293783d28ceb	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 07:09:19.930156+00	
00000000-0000-0000-0000-000000000000	dbebeb4a-1ff3-4bf6-a18f-6027b3178e39	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 07:09:19.93322+00	
00000000-0000-0000-0000-000000000000	0747c02c-6804-41d1-8aef-1b25172c1263	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 07:19:04.664278+00	
00000000-0000-0000-0000-000000000000	f672ba71-2d5c-4b6c-aacf-c7cfb58d49bb	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 07:19:04.667957+00	
00000000-0000-0000-0000-000000000000	238ab54a-c67a-4bdc-8751-835ba20b8da3	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 07:54:28.568499+00	
00000000-0000-0000-0000-000000000000	a46644da-42f2-4b61-92df-56b5b3df88f0	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 07:54:28.580624+00	
00000000-0000-0000-0000-000000000000	cf64cdc3-83ad-494e-99ec-d58757104e5d	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:08:07.955384+00	
00000000-0000-0000-0000-000000000000	f6db7ff6-0c3d-49f9-821e-89ea95c09de5	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:08:07.961522+00	
00000000-0000-0000-0000-000000000000	3e083a5e-a445-4132-b4b0-27ddf86aacd7	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:19:43.064845+00	
00000000-0000-0000-0000-000000000000	510e5aec-c05b-4bda-aedc-77ce2ef9a14a	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:19:43.06692+00	
00000000-0000-0000-0000-000000000000	9cc772f9-de61-4d96-8fb8-004e2f587cf3	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:25:11.026868+00	
00000000-0000-0000-0000-000000000000	8134927c-9ad9-4c9b-bb31-4ad31d22284e	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:25:11.028367+00	
00000000-0000-0000-0000-000000000000	219f5a64-77a8-424f-87c0-be4ec3609410	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:48:07.499248+00	
00000000-0000-0000-0000-000000000000	78820012-77b5-4a58-95cc-8436ebaa2500	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:48:07.515335+00	
00000000-0000-0000-0000-000000000000	f7318b2f-201f-4d6b-a626-be626a5e071f	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:53:10.755962+00	
00000000-0000-0000-0000-000000000000	9355a9e3-2b53-4b21-beab-e77ebdc319fb	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 08:53:10.75844+00	
00000000-0000-0000-0000-000000000000	1da701ec-3aee-41cc-ad90-42d934596a26	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 09:06:22.611955+00	
00000000-0000-0000-0000-000000000000	257494c0-a830-451b-893a-b087e0b8424c	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 09:06:22.625488+00	
00000000-0000-0000-0000-000000000000	ec415a8e-9637-4b47-93bf-ed527ac2dbd7	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 09:29:56.834292+00	
00000000-0000-0000-0000-000000000000	edff6ce9-fb58-4040-905d-b946562c64a4	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 09:29:56.856614+00	
00000000-0000-0000-0000-000000000000	7ec382cd-f73a-4fa0-bb4c-b2b762f41413	{"action":"token_refreshed","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 09:48:48.580245+00	
00000000-0000-0000-0000-000000000000	ff36be60-f229-48dd-ac29-5140e27a1095	{"action":"token_revoked","actor_id":"9950b2e9-632f-42ff-b259-726ede4e408f","actor_username":"emirpuente31@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 09:48:48.602421+00	
00000000-0000-0000-0000-000000000000	4233189d-26c7-49cb-9bbc-baca8dd9576b	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 09:51:15.743082+00	
00000000-0000-0000-0000-000000000000	503191be-886b-418d-b833-1f8329b35c55	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 09:51:15.74566+00	
00000000-0000-0000-0000-000000000000	3e5c9031-d856-4f51-95bc-d38d4f590949	{"action":"token_refreshed","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 10:15:12.730128+00	
00000000-0000-0000-0000-000000000000	037835ef-5718-4c52-8eab-d552be420f66	{"action":"token_revoked","actor_id":"7dfad126-2905-431a-829b-fcae851fe102","actor_username":"a01722728@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 10:15:12.744914+00	
00000000-0000-0000-0000-000000000000	25977226-9c8a-4770-bf50-ee5987495102	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 10:32:10.123474+00	
00000000-0000-0000-0000-000000000000	6c6a2d92-56f1-423b-a320-400507ccc636	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 10:32:10.133008+00	
00000000-0000-0000-0000-000000000000	34705a39-96b3-4ace-be03-31365474f85d	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 10:57:51.906674+00	
00000000-0000-0000-0000-000000000000	564b3a7a-cc6f-4ac7-a0e1-c8a06afd6694	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 10:57:51.915469+00	
00000000-0000-0000-0000-000000000000	fa944b9f-5f40-45e1-86ea-6684d253fcee	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 10:58:13.820469+00	
00000000-0000-0000-0000-000000000000	e7dbfee2-d9e3-4adf-82eb-c2c0dd47f083	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 10:59:35.349496+00	
00000000-0000-0000-0000-000000000000	bc4c7523-9338-4a1e-82b2-a1f6733be8bd	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 10:59:35.350161+00	
00000000-0000-0000-0000-000000000000	b8e4e5e2-e9cf-4a89-abfc-7d991b35572a	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 11:05:03.605427+00	
00000000-0000-0000-0000-000000000000	f7c33874-1a87-4322-827c-96410d233d5a	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 11:52:02.972689+00	
00000000-0000-0000-0000-000000000000	08bf6fce-da01-45a4-955e-4aa58806d87f	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 11:53:16.144282+00	
00000000-0000-0000-0000-000000000000	7794152e-c60d-4ac5-8d2d-5bbebf259c8a	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 11:54:52.825394+00	
00000000-0000-0000-0000-000000000000	8a95b31e-1478-434f-8713-d4a2ae7c40da	{"action":"user_recovery_requested","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"user"}	2025-04-25 11:55:23.096204+00	
00000000-0000-0000-0000-000000000000	6b6ab36a-ae14-4fd0-9a13-00ce23555a1d	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account"}	2025-04-25 11:56:28.918027+00	
00000000-0000-0000-0000-000000000000	afbcabf2-936d-4131-afdf-048d5dc36e42	{"action":"user_updated_password","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"user"}	2025-04-25 11:56:39.97544+00	
00000000-0000-0000-0000-000000000000	e54dc16f-7f51-4d63-a2e3-f00b0972595f	{"action":"user_modified","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"user"}	2025-04-25 11:56:39.977174+00	
00000000-0000-0000-0000-000000000000	8925fe3d-02b5-475e-9e64-55f8ab2493e1	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 11:56:52.335202+00	
00000000-0000-0000-0000-000000000000	1875071a-c93e-4ddf-82eb-7a433878add3	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 11:59:17.221049+00	
00000000-0000-0000-0000-000000000000	32689dc2-ba03-4dde-b62e-34b9c9523e92	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 11:59:17.222627+00	
00000000-0000-0000-0000-000000000000	f612844e-974d-4d1d-8506-c59ef8b4d9b8	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 12:05:54.36+00	
00000000-0000-0000-0000-000000000000	f54748e2-327f-4037-98ae-0c6a047734c6	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 12:35:28.321986+00	
00000000-0000-0000-0000-000000000000	796c8325-53de-45b2-b296-d7429c5e67f8	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 12:35:28.325084+00	
00000000-0000-0000-0000-000000000000	f56065ce-af17-4fad-98b6-8c0b9c68fa24	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 12:35:37.99836+00	
00000000-0000-0000-0000-000000000000	848cad32-4dd5-463d-8ad7-e3aea248b700	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 12:57:38.07423+00	
00000000-0000-0000-0000-000000000000	fbba2016-ab6d-4c5d-a664-0c4f163c26cc	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 12:57:38.076246+00	
00000000-0000-0000-0000-000000000000	6fdf6ae3-eb4c-4250-9309-c578cf4540a8	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 13:04:40.935715+00	
00000000-0000-0000-0000-000000000000	591e8901-4554-474c-8dc6-4b42b6f9c387	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 13:04:40.93864+00	
00000000-0000-0000-0000-000000000000	3994874d-af99-464a-b4be-c445c5682d98	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 13:18:37.306863+00	
00000000-0000-0000-0000-000000000000	16e9dfe5-4e40-4e57-9950-783782f75870	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 13:31:40.151399+00	
00000000-0000-0000-0000-000000000000	c267b1e0-962f-42f4-82c1-1d8610f38564	{"action":"login","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 13:33:00.018052+00	
00000000-0000-0000-0000-000000000000	34775432-9144-4a6a-9cc7-d59410eca750	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 14:48:44.581746+00	
00000000-0000-0000-0000-000000000000	82305706-97c6-4431-87e1-1c13f53c1626	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 14:48:44.59098+00	
00000000-0000-0000-0000-000000000000	a125c3ac-9e78-4092-a825-e323cb6528bf	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 14:48:58.908648+00	
00000000-0000-0000-0000-000000000000	4110bbcb-37f2-469d-b080-bb1c22dbf337	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 15:15:27.985036+00	
00000000-0000-0000-0000-000000000000	448de084-5dfc-4ef9-826f-4cd69c47cea3	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 15:15:27.988177+00	
00000000-0000-0000-0000-000000000000	4c2efb92-f315-425a-95c4-d057245d0630	{"action":"login","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 15:15:38.82311+00	
00000000-0000-0000-0000-000000000000	faa4faef-1b56-44e9-b980-799c7c4d2945	{"action":"token_refreshed","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 15:38:51.444591+00	
00000000-0000-0000-0000-000000000000	e2fdabcc-4013-4a39-a53d-9a651c731929	{"action":"token_revoked","actor_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","actor_username":"rantonion2004@outlook.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 15:38:51.44812+00	
00000000-0000-0000-0000-000000000000	5a5180d1-9ed2-4c04-8bd5-b0c1d863ac2c	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 15:55:40.557081+00	
00000000-0000-0000-0000-000000000000	9fc0b0cd-ab3d-4fd2-a0c0-34d4edca92e9	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 15:55:40.563284+00	
00000000-0000-0000-0000-000000000000	b4bf4191-7291-4aac-b054-192f6d05a4a3	{"action":"login","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 15:56:21.732914+00	
00000000-0000-0000-0000-000000000000	ffafd8f4-2b3b-4989-ad6b-0fed38ec486b	{"action":"token_refreshed","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 16:13:42.524894+00	
00000000-0000-0000-0000-000000000000	976b8b5f-1c12-459d-b6d9-cdd1dad38c72	{"action":"token_revoked","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 16:13:42.535897+00	
00000000-0000-0000-0000-000000000000	fd7d1ee0-9f7e-4c39-97ac-4c03671a401f	{"action":"user_signedup","actor_id":"007641ab-7526-4329-b4e4-c3473a05af8d","actor_username":"aks@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-25 16:42:57.405029+00	
00000000-0000-0000-0000-000000000000	c0f2e852-94b1-492d-82ab-e386ec149849	{"action":"login","actor_id":"007641ab-7526-4329-b4e4-c3473a05af8d","actor_username":"aks@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 16:42:57.413656+00	
00000000-0000-0000-0000-000000000000	44c6f78d-fd68-4c08-a824-123767105481	{"action":"token_refreshed","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 17:00:44.500565+00	
00000000-0000-0000-0000-000000000000	ae4940fa-87ce-4092-91b8-5c418a512e4e	{"action":"token_revoked","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 17:00:44.50308+00	
00000000-0000-0000-0000-000000000000	82d00e26-0d39-4776-a51d-816d009bfbf7	{"action":"login","actor_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","actor_username":"a01198327@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 17:00:54.421931+00	
00000000-0000-0000-0000-000000000000	17b460f0-6b1f-4568-84bf-f75d06b82192	{"action":"token_refreshed","actor_id":"007641ab-7526-4329-b4e4-c3473a05af8d","actor_username":"aks@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 17:41:09.353835+00	
00000000-0000-0000-0000-000000000000	fe98ac11-121a-45d1-bb28-3f9669fd6c19	{"action":"token_revoked","actor_id":"007641ab-7526-4329-b4e4-c3473a05af8d","actor_username":"aks@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-25 17:41:09.356521+00	
00000000-0000-0000-0000-000000000000	e07cc233-7d85-48af-9914-11cb7170b8dd	{"action":"logout","actor_id":"007641ab-7526-4329-b4e4-c3473a05af8d","actor_username":"aks@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-04-25 17:49:37.551288+00	
00000000-0000-0000-0000-000000000000	89feb2e9-4d58-4dc9-aafc-dae66f0db38d	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zi@tec.mx","user_id":"577146a4-87b1-4f34-9bb1-824140ff4c54","user_phone":""}}	2025-04-25 17:53:22.974473+00	
00000000-0000-0000-0000-000000000000	bc8c0d1c-f6c7-4045-b6f9-261ff9320872	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"amogus@a.com","user_id":"d2f63e49-f24d-4cda-8ff8-9056d6ee4bea","user_phone":""}}	2025-04-25 17:53:22.982498+00	
00000000-0000-0000-0000-000000000000	ff6b2581-d280-4fd8-b8c8-b30ff21a6dcb	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01198327@tec.mx","user_id":"06e8e948-5dd3-4b5f-b314-25fa5cd5893b","user_phone":""}}	2025-04-25 17:53:23.001043+00	
00000000-0000-0000-0000-000000000000	a6791156-5bb4-4bf0-9859-e91ba4d020ed	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zic@tec.mx","user_id":"809bf7bd-14ec-4553-9e37-90a697149799","user_phone":""}}	2025-04-25 17:53:23.01282+00	
00000000-0000-0000-0000-000000000000	4889e565-0d1d-4ef2-83c9-ad6f68196217	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"talent@g.com","user_id":"0475f20b-25ce-485e-95cc-bd729859637d","user_phone":""}}	2025-04-25 17:53:23.00824+00	
00000000-0000-0000-0000-000000000000	e28b6f79-0a27-4e67-a6a9-991a3b822210	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ajd@tec.mx","user_id":"392c88d5-a2c3-4a14-88d1-2d84bc8133c5","user_phone":""}}	2025-04-25 17:53:23.021943+00	
00000000-0000-0000-0000-000000000000	cc0ff80d-2142-4b70-9a95-d93048499fa1	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test02@g.com","user_id":"b314f0e1-5f44-48a5-9a99-30387795843c","user_phone":""}}	2025-04-25 17:53:23.022437+00	
00000000-0000-0000-0000-000000000000	f9085e18-bacb-4a64-b875-08b6da13857c	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"oi@c.c","user_id":"0a38c26c-3a86-42cb-b39b-c9c76848f0e5","user_phone":""}}	2025-04-25 17:53:23.029294+00	
00000000-0000-0000-0000-000000000000	6f641229-11cd-4f99-839e-aba809d81072	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"kjsnd@h.co","user_id":"a0a40b5c-c8be-40f1-ae42-d8bb32677c8e","user_phone":""}}	2025-04-25 17:53:23.031176+00	
00000000-0000-0000-0000-000000000000	37ab9025-335e-4372-98ca-2e0d04d9a678	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"liz@g.com","user_id":"7ff2a62c-ef30-4c1e-8465-57ada3bb6897","user_phone":""}}	2025-04-25 17:53:23.035555+00	
00000000-0000-0000-0000-000000000000	25212202-f61e-49db-8d0e-a12d522a9da7	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"delivery@g.com","user_id":"66297fcd-b66d-4deb-ad5b-f24ba1dfd26a","user_phone":""}}	2025-04-25 17:53:23.041585+00	
00000000-0000-0000-0000-000000000000	dd264c4b-be5b-4d49-880d-f4710fbf72ed	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"capability@g.com","user_id":"412b6cda-4dbd-4bec-832e-1509eaf56414","user_phone":""}}	2025-04-25 17:53:23.042303+00	
00000000-0000-0000-0000-000000000000	7d448a4e-7b89-43be-b1f6-cc4a8b6186d7	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sd@tec.mx","user_id":"37a795b1-0a19-41ca-a09c-805dc258ac38","user_phone":""}}	2025-04-25 17:53:23.039563+00	
00000000-0000-0000-0000-000000000000	8833329d-eef6-47fb-886c-41e4d03055e7	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"caso@g.com","user_id":"ef15530b-dd57-4e43-a6ab-a04aa7b3a979","user_phone":""}}	2025-04-25 17:53:23.05232+00	
00000000-0000-0000-0000-000000000000	818a92e8-2ea6-47d5-9257-96ac2e688c9f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zy2@gmail.com","user_id":"9cdc8f90-0c14-4d94-bfba-45c371b30735","user_phone":""}}	2025-04-25 17:53:23.058386+00	
00000000-0000-0000-0000-000000000000	cd1fdff6-8615-4436-b271-a0057e0512a3	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"aks@gmail.com","user_id":"007641ab-7526-4329-b4e4-c3473a05af8d","user_phone":""}}	2025-04-25 17:53:23.062171+00	
00000000-0000-0000-0000-000000000000	cd30a1d1-0a54-4f0e-b042-d2cccf6b2415	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"peoplelead@g.com","user_id":"53080ade-33ee-4342-ae5e-9683f4368b6a","user_phone":""}}	2025-04-25 17:53:23.072382+00	
00000000-0000-0000-0000-000000000000	6a035cd7-d762-4a5b-9912-6006e5eab09c	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jorgebcarriles@outlook.com","user_id":"c0534a2b-cecc-444e-99a4-acb9f7eca6de","user_phone":""}}	2025-04-25 17:54:05.940679+00	
00000000-0000-0000-0000-000000000000	59f3c7ab-1dcf-4664-b60e-b476dedc01f4	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"amn@gmail.com","user_id":"6eb32f88-231e-4237-9f93-6689a94b624d","user_phone":""}}	2025-04-25 17:54:05.955197+00	
00000000-0000-0000-0000-000000000000	42a07f5d-0d84-41fc-b3c5-0985be0fb348	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a@gmail.com","user_id":"b47428a9-2529-4a4a-b02f-5c42648e88a9","user_phone":""}}	2025-04-25 17:54:05.998625+00	
00000000-0000-0000-0000-000000000000	810de81b-a179-45ab-8293-ec84294880c7	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"yi@gmail.com","user_id":"9d6ddaee-5f7c-4cef-8705-6db6a8d11109","user_phone":""}}	2025-04-25 17:54:06.006988+00	
00000000-0000-0000-0000-000000000000	e8f42502-bf2c-44c8-bc17-94591a9d16a7	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"xnhs@gmail.com","user_id":"c3886a9b-c360-4fec-b16d-058747789ee2","user_phone":""}}	2025-04-25 17:54:06.026461+00	
00000000-0000-0000-0000-000000000000	f387ad29-a919-4b81-aff7-453c8800c0ba	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rantonion2004@outlook.com","user_id":"ff98b050-236d-4a28-8aea-567f03b9f3c3","user_phone":""}}	2025-04-25 17:54:06.088485+00	
00000000-0000-0000-0000-000000000000	c1869942-3c4d-4b55-9966-d9a225a26f3f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a3@cd.mx","user_id":"204b4114-7454-40dd-afd4-d4521f0c2558","user_phone":""}}	2025-04-25 17:54:06.098076+00	
00000000-0000-0000-0000-000000000000	bfd2feeb-d9fc-40da-bace-81db0a54cd16	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"auch@gmail.com","user_id":"2eadd525-41bd-4c5d-9073-faf9c6b91714","user_phone":""}}	2025-04-25 17:54:06.105933+00	
00000000-0000-0000-0000-000000000000	7c5204be-4de7-4b75-9fb7-7d76ba9f7688	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rikytellez04@gmail.com","user_id":"ecdca837-6a64-41a9-9642-196ffac92612","user_phone":""}}	2025-04-25 17:54:06.125691+00	
00000000-0000-0000-0000-000000000000	5d0ae8b0-d889-4716-9832-03a5e3a88531	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"axsax@gmail.com","user_id":"a004e928-2b22-4749-ad53-9232297705be","user_phone":""}}	2025-04-25 17:54:06.154327+00	
00000000-0000-0000-0000-000000000000	8ee44fe6-d76b-44d0-9850-29a02285a739	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"emirpuente31@gmail.com","user_id":"9950b2e9-632f-42ff-b259-726ede4e408f","user_phone":""}}	2025-04-25 17:54:06.164134+00	
00000000-0000-0000-0000-000000000000	60e9dedd-6aee-411a-afc2-e01363a7fc44	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@t.com","user_id":"31fbe58a-c798-401a-b2aa-c06726293956","user_phone":""}}	2025-04-25 17:54:06.167854+00	
00000000-0000-0000-0000-000000000000	c4afdb44-50fc-4fe1-8587-9b8cc849c7cb	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01198676@tec.mx","user_id":"564b41de-e4a1-4e56-bff7-c0681abc0718","user_phone":""}}	2025-04-25 17:54:06.179012+00	
00000000-0000-0000-0000-000000000000	5951db37-4729-4f4b-b2da-b9fcf4726912	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01722728@tec.mx","user_id":"7dfad126-2905-431a-829b-fcae851fe102","user_phone":""}}	2025-04-25 17:54:06.092674+00	
00000000-0000-0000-0000-000000000000	3189a8e4-a9fd-41f0-a4dd-15d66bcf6d01	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"axd1@gmail.com","user_id":"a57aab4d-0c82-479b-91cd-2502a0c7dac8","user_phone":""}}	2025-04-25 17:54:06.157469+00	
00000000-0000-0000-0000-000000000000	b7f4fd43-2205-46d9-8ca6-ab9b1ff8eb3e	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"abssh@g.com","user_id":"0e41703f-9367-446f-ab66-0c5477edda65","user_phone":""}}	2025-04-25 17:54:06.162315+00	
00000000-0000-0000-0000-000000000000	4ad6dd0b-66b1-4f87-a92e-ee8d8295ef89	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"davidminirey04@gmail.com","user_id":"17be3a68-8d97-4557-85e8-8e8cc9ecbc13","user_phone":""}}	2025-04-25 17:54:06.170951+00	
00000000-0000-0000-0000-000000000000	ada8b8c1-2b87-4833-8f79-3edd1b02db27	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rikytellez04@hotmail.com","user_id":"31f3a821-66c2-42eb-8def-2880197e8a7d","user_phone":""}}	2025-04-25 17:54:06.178769+00	
00000000-0000-0000-0000-000000000000	c1bc2c1f-bf85-4c96-835f-c9252e8bde77	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"naranjilandia2004@gmail.com","user_id":"dee4835c-764c-40fb-bf0b-3bff8a0457d4","user_phone":""}}	2025-04-25 17:54:06.158214+00	
00000000-0000-0000-0000-000000000000	3eaa6307-1ad5-4341-b4c4-85ef4c8f7e2b	{"action":"user_repeated_signup","actor_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-04-25 18:06:50.932031+00	
00000000-0000-0000-0000-000000000000	b95687b7-85d8-4543-9ad3-0fc1fb3fe906	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"a01741300@tec.mx","user_id":"7478c90f-4de7-494d-ae79-fc28756dc4ab","user_phone":""}}	2025-04-25 18:07:17.293632+00	
00000000-0000-0000-0000-000000000000	04aa2d0b-594c-438b-8772-34a1eae2cce3	{"action":"user_signedup","actor_id":"5f096705-11c3-49b1-b42c-d7bd17a75439","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-04-25 18:07:22.173069+00	
00000000-0000-0000-0000-000000000000	0cdbc032-dfe2-43ea-a29a-761057efc7dc	{"action":"login","actor_id":"5f096705-11c3-49b1-b42c-d7bd17a75439","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 18:07:22.177956+00	
00000000-0000-0000-0000-000000000000	3d25fd0a-471b-4331-8c12-4aa71696c47d	{"action":"login","actor_id":"5f096705-11c3-49b1-b42c-d7bd17a75439","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 18:23:20.013727+00	
00000000-0000-0000-0000-000000000000	08ec6024-f9c8-4adb-99cf-91d158834c31	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"empleado@g.com","user_id":"b5d11271-9904-408a-b5ee-ae67ebda0586","user_phone":""}}	2025-04-25 17:53:23.067329+00	
00000000-0000-0000-0000-000000000000	494d9098-5bd9-445d-8afc-1341a3866a87	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test03@g.com","user_id":"44339363-8791-433b-93d4-93642c90c69a","user_phone":""}}	2025-04-25 17:53:23.067509+00	
00000000-0000-0000-0000-000000000000	6d955a41-fc3c-49c6-9d7c-5998afc61ef6	{"action":"login","actor_id":"5f096705-11c3-49b1-b42c-d7bd17a75439","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 19:14:25.019533+00	
00000000-0000-0000-0000-000000000000	2d782c64-a5f7-4a3c-83ec-5b837d71a7f6	{"action":"token_refreshed","actor_id":"5f096705-11c3-49b1-b42c-d7bd17a75439","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 19:21:24.826927+00	
00000000-0000-0000-0000-000000000000	2f955a1f-04b8-4c4a-a446-e6a6685d00bf	{"action":"token_revoked","actor_id":"5f096705-11c3-49b1-b42c-d7bd17a75439","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"token"}	2025-04-25 19:21:24.830789+00	
00000000-0000-0000-0000-000000000000	50097490-7cc8-4d8f-a1b7-ad308bd38cd3	{"action":"login","actor_id":"5f096705-11c3-49b1-b42c-d7bd17a75439","actor_username":"a01741300@tec.mx","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-25 19:21:25.950877+00	
00000000-0000-0000-0000-000000000000	e9808493-875b-4f0e-aef8-50e3e5d25a93	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test01@g.com","user_id":"2ccb7762-72c7-4aeb-93ab-5b628ea330f3","user_phone":""}}	2025-04-25 17:53:23.059966+00	
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
00000000-0000-0000-0000-000000000000	5f096705-11c3-49b1-b42c-d7bd17a75439	authenticated	authenticated	a01741300@tec.mx	$2a$10$m.4NE4AbrUfdj2u8qVPON.NRLet7oUH8USUY3JZVkQsNHBvbJPGvK	2025-04-25 18:07:22.173589+00	\N		\N		\N			\N	2025-04-25 19:21:25.951582+00	{"provider": "email", "providers": ["email"]}	{"sub": "5f096705-11c3-49b1-b42c-d7bd17a75439", "name": "Sergio Ricardo Tellez Loaiza", "role": "employee", "email": "a01741300@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-25 18:07:22.161449+00	2025-04-25 19:21:25.95599+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
5f096705-11c3-49b1-b42c-d7bd17a75439	5f096705-11c3-49b1-b42c-d7bd17a75439	{"sub": "5f096705-11c3-49b1-b42c-d7bd17a75439", "name": "Sergio Ricardo Tellez Loaiza", "role": "employee", "email": "a01741300@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-25 18:07:22.16918+00	2025-04-25 18:07:22.169228+00	2025-04-25 18:07:22.169228+00	e316eb14-bcf8-4de2-a77c-7d13a0b7bab4
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
6eee426d-fbb8-4322-b0ef-7a40cd52c017	5f096705-11c3-49b1-b42c-d7bd17a75439	2025-04-25 18:07:22.178609+00	2025-04-25 18:07:22.178609+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
ee0ceb79-6cae-4ef3-8f6f-c24dfc96938f	5f096705-11c3-49b1-b42c-d7bd17a75439	2025-04-25 18:23:20.016461+00	2025-04-25 19:21:24.839798+00	\N	aal1	\N	2025-04-25 19:21:24.839726	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.200	\N
2c768cde-8e18-4c0d-bb4a-7e9fa86f5934	5f096705-11c3-49b1-b42c-d7bd17a75439	2025-04-25 19:14:25.033173+00	2025-04-25 19:14:25.033173+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.168	\N
18be7444-dded-4a9a-af28-fed268d39843	5f096705-11c3-49b1-b42c-d7bd17a75439	2025-04-25 19:21:25.951654+00	2025-04-25 19:21:25.951654+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 OPR/118.0.0.0 (Edition ASUS)	131.178.102.148	\N
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
6eee426d-fbb8-4322-b0ef-7a40cd52c017	2025-04-25 18:07:22.181991+00	2025-04-25 18:07:22.181991+00	password	e9eda132-272b-45f9-9b75-7d79f3f449f9
2c768cde-8e18-4c0d-bb4a-7e9fa86f5934	2025-04-25 19:14:25.063623+00	2025-04-25 19:14:25.063623+00	password	9f780cf6-c3ce-476f-8cb7-55684113bfa5
ee0ceb79-6cae-4ef3-8f6f-c24dfc96938f	2025-04-25 18:23:20.022595+00	2025-04-25 18:23:20.022595+00	password	190fb0d3-405d-457a-9b7c-cc3a2998845b
18be7444-dded-4a9a-af28-fed268d39843	2025-04-25 19:21:25.956748+00	2025-04-25 19:21:25.956748+00	password	4561ed2f-e4b9-4df4-a4ee-25832ef39d9b
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
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
00000000-0000-0000-0000-000000000000	380	vNtpC79IoLL7jFc5rNAvwA	5f096705-11c3-49b1-b42c-d7bd17a75439	f	2025-04-25 18:07:22.179458+00	2025-04-25 18:07:22.179458+00	\N	6eee426d-fbb8-4322-b0ef-7a40cd52c017
00000000-0000-0000-0000-000000000000	381	oqHVG30OnYS5bLf4guqeaQ	5f096705-11c3-49b1-b42c-d7bd17a75439	t	2025-04-25 18:23:20.019917+00	2025-04-25 19:21:24.831356+00	\N	ee0ceb79-6cae-4ef3-8f6f-c24dfc96938f
00000000-0000-0000-0000-000000000000	382	_AjdKXzHROeH7GcTrlVMxA	5f096705-11c3-49b1-b42c-d7bd17a75439	f	2025-04-25 19:14:25.040383+00	2025-04-25 19:14:25.040383+00	\N	2c768cde-8e18-4c0d-bb4a-7e9fa86f5934
00000000-0000-0000-0000-000000000000	383	aHJarg8iUldcoR92gWUhWA	5f096705-11c3-49b1-b42c-d7bd17a75439	f	2025-04-25 19:21:24.835747+00	2025-04-25 19:21:24.835747+00	oqHVG30OnYS5bLf4guqeaQ	ee0ceb79-6cae-4ef3-8f6f-c24dfc96938f
00000000-0000-0000-0000-000000000000	384	Y0dNVt_wS5tbacHunDZEzw	5f096705-11c3-49b1-b42c-d7bd17a75439	f	2025-04-25 19:21:25.954078+00	2025-04-25 19:21:25.954078+00	\N	18be7444-dded-4a9a-af28-fed268d39843
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
5f096705-11c3-49b1-b42c-d7bd17a75439
\.


--
-- Data for Name: Departamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Departamento" ("ID_Departamento", "Nombre", "Descripcion") FROM stdin;
dd6c79f7-80fd-48b3-97f6-119551d3d2c3	TI	Tecnologias de la informacion
e4661077-c41c-4f4b-ad46-c5a29baf229a	IA	Inteligencia Artificial
d85d9ef9-0288-4462-bb3b-13c1d86cdf68	UX/UI	Diseño
cf57cc7b-7d64-473a-b31e-97fc5736d380	HR	Recursos Humanos
\.


--
-- Data for Name: Empleado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Empleado" ("ID_Empleado", "Nombre", "Rol", "ID_Departamento", "Nivel", "Cargabilidad", "FechaContratacion", "FechaUltNivel", "ID_PeopleLead", "Biografia") FROM stdin;
5f096705-11c3-49b1-b42c-d7bd17a75439	Sergio Ricardo Tellez Loaiza	Admin	dd6c79f7-80fd-48b3-97f6-119551d3d2c3	12	0%	2025-04-25	2025-04-25	\N	Estudiante de ITC en el tecnologico de Monterrey
\.


--
-- Data for Name: Capability_Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Capability_Lead" ("ID_CapabilityLead", "ID_Departamento", "ID_Empleado") FROM stdin;
d12c4151-1b84-4db0-8de2-c14bc7dffd13	\N	5f096705-11c3-49b1-b42c-d7bd17a75439
\.


--
-- Data for Name: Certificados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Certificados" ("ID_Certificado", "Nombre", "Fecha_caducidad", "Documento", "ID_Empleado", "Verificacion", "Descripcion") FROM stdin;
\.


--
-- Data for Name: Contacto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Contacto" ("PK_Contacto", "Email", "Num_Telefono", "ID_empleado", "Estado", "Pais") FROM stdin;
5fc4d1a4-5ff2-49cd-99fc-32739838dc5b	A01741300@tec.mx	6672640278	5f096705-11c3-49b1-b42c-d7bd17a75439	Sinaloa	Mexico
\.


--
-- Data for Name: Cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Cliente" ("PK_Cliente", "Nombre", "RFC", "ID_Contacto") FROM stdin;
\.


--
-- Data for Name: Cursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Cursos" ("ID_Curso", "Nombre", "Fecha_fin_curso", "link", "Descripcion") FROM stdin;
5f5bbec7-f37a-4d7a-83a3-3e2b6780e700	React Development	2025-05-15	https://www.freecodecamp.org/news/learn-javascript-free-js-courses-for-beginners/#heading-learn-javascript-full-course-for-beginners	\N
b855f167-1544-4b59-b7df-0b6cc9e771c0	Leadership Training	2025-03-01	https://www.scrum.org/courses/professional-agile-leadership-essentials-training	\N
008549c6-44fd-4c33-b12c-5509dbe5be02	Linux for Servers	2025-06-13	https://www.netacad.com/courses/linux-essentials?courseLang=en-US	A course to learn linux basics for system administration.
5851613a-0116-4c81-acf2-b669b477a8c0	React Development	\N	https://www.google.com/search?q=never+gonna+give+you+up&sca_esv=178908ee291956e1&sxsrf=AHTn8zrFLIYrpVip5Yamqb7EzRwcUPn-9A%3A1745580309874&ei=FXELaJqfNZmRur8Pjuz46A0&gs_ssp=eJzj4tVP1zc0TEmriK8wSDcxYPQSz0stSy1SSM_Py0tUSM8sS1WozC9VKC0AAANTDVU&oq=never&gs_lp=Egxnd3Mtd2l6LXNlcnAiBW5ldmVyKgIIADIKEC4YgAQYQxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTINEC4YgAQYsQMYQxiKBTIFEC4YgAQyCxAuGIAEGLEDGNQCMggQLhiABBixAzIFEAAYgAQyCBAuGIAEGLEDMhkQLhiABBhDGIoFGJcFGNwEGN4EGOAE2AEBSN4cUJAEWOgRcAJ4AZABBZgB8QGgAdIMqgEFMC45LjK4AQPIAQD4AQGYAgigAqAPqAISwgIKEAAYsAMY1gQYR8ICDRAAGIAEGLADGEMYigXCAg4QABiwAxjkAhjWBNgBAcICExAuGIAEGLADGEMYyAMYigXYAQHCAhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBwgIIEAAYgAQYsQPCAggQABiABBjLAcICBxAuGIAEGArCAgcQIxgnGOoCwgITEAAYgAQYQxi0AhiKBRjqAtgBAcICFhAuGIAEGEMYtAIYyAMYigUY6gLYAQHCAhwQLhiABBjRAxhDGLQCGMcBGMgDGIoFGOoC2AEBwgIMECMYgAQYExgnGIoFwgIKECMYgAQYJxiKBcICBBAjGCfCAhEQLhiABBixAxjRAxiDARjHAcICCxAuGIAEGLEDGIMBwgIOEAAYgAQYsQMYgwEYigXCAgsQABiABBixAxiDAcICDhAuGIAEGLEDGNEDGMcBmAMG8QVRqv3Gjf9Cd4gGAZAGEroGBggBEAEYCZIHBzIuNS43LTGgB4-YArIHBzAuNS43LTG4B5EP&sclient=gws-wiz-serp	Curso react
fe3d17f4-b04f-43ff-960f-10ae65ecffef	Curso de Administración Municipal	\N	https://maestriasydiplomados.tec.mx/programas/curso-administracion-municipal-programa-en-linea	Curso para aprender administración
a6933529-e7b5-4c46-9c09-42deed11e379	Curso de analisis de estados financieros	\N	https://maestriasydiplomados.tec.mx/programas/curso-analisis-de-los-estados-financieros-programa-en-linea	Curso para análisis de estados financieros
94d16417-4d6d-4893-989b-fa6aa3ac2a97	Administracion de costos	\N	https://maestriasydiplomados.tec.mx/programas/administracion-de-costos-virtual	Administracion de costos en linea
66d6cc25-fd94-41bd-b9cf-74560555d85b	Trust course	\N	https://matias.me/nsfw/	Mejora tu confianza
\.


--
-- Data for Name: Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Habilidades" ("ID_Habilidad", "Tipo", "Descripcion") FROM stdin;
99609094-6f54-44e7-924e-f2687bc6856d	soft	Comunicación efectiva
260f88aa-a48f-4c1f-acdf-8d9c9f133366	soft	Trabajo en equipo
b859e31c-d9c5-4da2-97b3-0cae73d1ca8d	soft	Pensamiento crítico
c6d9e2bc-3bd4-4ec9-888a-20fc12df9c91	soft	Gestión del tiempo
c704d03a-5862-4b22-9594-ebb55fbff921	soft	Adaptabilidad
e12a980c-8c80-4e81-9fca-0b58cad7121c	hard	Programación 
499d3aba-855f-4473-92ef-11cd41854768	hard	Bases de datos
2d8a92fc-0028-498f-9900-38a9ca3233a8	hard	Control de versiones
4bf3924e-4ef8-4436-88bb-1ffcd61750e3	hard	Desarrollo web
e647396c-c1a3-447e-b114-4adc7852a116	hard	Análisis de datos
\.


--
-- Data for Name: Cursos_Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Cursos_Habilidades" ("created_at", "ID_Curso", "ID_Habilidad") FROM stdin;
\.


--
-- Data for Name: Delivery_Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Delivery_Lead" ("ID_DeliveryLead", "Nombre", "Rol", "ID_Empleado") FROM stdin;
b4bcad2d-9e33-42c7-b844-0ba90e44392e	\N	\N	5f096705-11c3-49b1-b42c-d7bd17a75439
\.


--
-- Data for Name: Empleado_Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Empleado_Habilidades" ("ID_Empleado", "ID_Habilidad", "Estado") FROM stdin;
5f096705-11c3-49b1-b42c-d7bd17a75439	260f88aa-a48f-4c1f-acdf-8d9c9f133366	\N
5f096705-11c3-49b1-b42c-d7bd17a75439	c704d03a-5862-4b22-9594-ebb55fbff921	\N
5f096705-11c3-49b1-b42c-d7bd17a75439	4bf3924e-4ef8-4436-88bb-1ffcd61750e3	\N
5f096705-11c3-49b1-b42c-d7bd17a75439	499d3aba-855f-4473-92ef-11cd41854768	\N
\.


--
-- Data for Name: Proyectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Proyectos" ("ID_Proyecto", "Nombre", "ID_Cliente", "Descripcion", "Status", "ID_DeliveryLead", "fecha_inicio", "fecha_fin") FROM stdin;
dd8b61fa-b013-46b1-ac31-9b13bd142bec	Website Panaderia	\N	Sitio web para una panaderia	\N	\N	2025-04-24	2025-04-30
d74b87b9-e2f1-4630-9111-d7bc8eeda82a	App parque local	\N	app movil para un parque local	\N	\N	2025-04-30	2025-05-07
\.


--
-- Data for Name: Empleado_Proyectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Empleado_Proyectos" ("ID_Empleado", "ID_Proyecto", "isApproved", "id") FROM stdin;
\.


--
-- Data for Name: People_lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."People_lead" ("ID", "ID_Empleado") FROM stdin;
66d20503-e75f-43d9-9572-54fa189dfb95	5f096705-11c3-49b1-b42c-d7bd17a75439
\.


--
-- Data for Name: FeedBack; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."FeedBack" ("ID_FeedBack", "ID_People_lead", "ID_Empleado", "Descripcion", "AreaMejora", "Desempeno") FROM stdin;
\.


--
-- Data for Name: Intereses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Intereses" ("ID_Interes", "Descripcion", "ID_Empleado") FROM stdin;
e72b5d3f-0a9f-4bdb-9966-baac308c8daf	Inteligencia artificial	5f096705-11c3-49b1-b42c-d7bd17a75439
\.


--
-- Data for Name: Metas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Metas" ("ID_meta", "Nombre", "Tipo_Meta", "Plazo", "Descripcion", "Fecha_limite", "ID_Empleado", "ID_Revisor", "Registrada", "Estado", "Self_Reflection") FROM stdin;
\.


--
-- Data for Name: Proyecto_Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Proyecto_Habilidades" ("ID_Proyecto", "ID_Habilidad") FROM stdin;
\.


--
-- Data for Name: Puesto_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Puesto_proyecto" ("id", "created_at", "ID_Empleado", "ID_Proyecto", "Puesto") FROM stdin;
\.


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Roles" ("id", "role_name", "Proyecto_id", "cantidad") FROM stdin;
eb7deb79-be2d-487f-8774-042b200825c8	Front end	dd8b61fa-b013-46b1-ac31-9b13bd142bec	\N
f1705d4b-e101-4f66-a2fa-1610966fa63b	Back end	dd8b61fa-b013-46b1-ac31-9b13bd142bec	\N
d327ad46-cb04-45c8-9d73-6f86f2dce92e	flutter dev	d74b87b9-e2f1-4630-9111-d7bc8eeda82a	\N
1c34fdfc-6eac-4108-a690-966ec9afcfa1	supabase dev	d74b87b9-e2f1-4630-9111-d7bc8eeda82a	\N
\.


--
-- Data for Name: Talent_Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Talent_Lead" ("ID_TalentLead", "ID_Departamento", "Rol", "ID_Empleado") FROM stdin;
8db3166f-8d56-4222-831b-17085911594e	\N	\N	5f096705-11c3-49b1-b42c-d7bd17a75439
\.


--
-- Data for Name: Talent_Discussion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Talent_Discussion" ("ID_TalentDiscussion", "Discussion", "ID_TalentLead", "ID_DeliveryLead", "ID_CapabilityLead", "ID_People_lead") FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") FROM stdin;
documentos	documentos	\N	2025-04-10 21:22:24.069294+00	2025-04-10 21:22:24.069294+00	t	f	\N	\N	\N
profile-pictures	profile-pictures	\N	2025-04-25 05:13:02.609511+00	2025-04-25 05:13:02.609511+00	t	f	\N	\N	\N
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") FROM stdin;
6063fae3-bab4-4dbc-8686-2269b215d7ff	documentos	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/Pathexplorer.pdf	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	2025-04-10 23:12:11.009621+00	2025-04-10 23:12:11.009621+00	2025-04-10 23:12:11.009621+00	{"eTag": "\\"33fe4788feab92ac37048e015d2dc97b\\"", "size": 3418655, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-10T23:12:11.000Z", "contentLength": 3418655, "httpStatusCode": 200}	a4d0ba27-bf3a-497f-807a-71b653304e3d	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	{}
34018ac1-cd59-42c9-ac94-8da929e02fec	documentos	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/828-2012.pdf	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	2025-04-11 22:24:42.493307+00	2025-04-11 22:24:42.493307+00	2025-04-11 22:24:42.493307+00	{"eTag": "\\"e748e171f5150ff0adc5197e31d5ea96\\"", "size": 697598, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-11T22:24:43.000Z", "contentLength": 697598, "httpStatusCode": 200}	1f4648a0-5dab-4f57-ad56-78f96d20550b	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	{}
5a6eb71e-ef9e-4910-9a77-1987dad6b310	documentos	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/29148-2011.pdf	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	2025-04-11 22:26:18.213406+00	2025-04-11 22:26:18.213406+00	2025-04-11 22:26:18.213406+00	{"eTag": "\\"ac672f2b922b7b109e5510a24e28a701\\"", "size": 631835, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-11T22:26:19.000Z", "contentLength": 631835, "httpStatusCode": 200}	a1275135-50d5-42d7-8cc2-6af8130ebc4d	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	{}
e6746f03-a7a2-4767-b00c-564001160db0	documentos	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/Data-Backup-Plan-Template_.docx-1.pdf	7dfad126-2905-431a-829b-fcae851fe102	2025-04-22 22:01:32.608499+00	2025-04-22 22:01:32.608499+00	2025-04-22 22:01:32.608499+00	{"eTag": "\\"45ed5302fdcf37830caf98189e96630f\\"", "size": 375174, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-22T22:01:33.000Z", "contentLength": 375174, "httpStatusCode": 200}	0b8ddd87-2716-4025-a441-ccd915b79302	7dfad126-2905-431a-829b-fcae851fe102	{}
a648f5fc-09eb-4547-bbd9-4c1b79b99009	documentos	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/Module Handbook Certificates 25-26_final_02_2025 (1).pdf	412b6cda-4dbd-4bec-832e-1509eaf56414	2025-04-23 18:30:26.299774+00	2025-04-23 18:30:26.299774+00	2025-04-23 18:30:26.299774+00	{"eTag": "\\"bb2be22b8a05c390fb840d333ec3102c\\"", "size": 1069889, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-23T18:30:27.000Z", "contentLength": 1069889, "httpStatusCode": 200}	0a5f40d6-a964-416c-8c36-038348924881	412b6cda-4dbd-4bec-832e-1509eaf56414	{}
2252ef02-8752-4b71-b018-217af1e780fa	documentos	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/M4 Luffy.pdf	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-10 23:08:25.649527+00	2025-04-24 20:18:03.933874+00	2025-04-10 23:08:25.649527+00	{"eTag": "\\"4d5e67c65953b2e674f9ae94879246be\\"", "size": 32834, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-24T20:18:04.000Z", "contentLength": 32834, "httpStatusCode": 200}	5ba5279c-f5fe-46af-9dff-2ca0a0d076b1	7478c90f-4de7-494d-ae79-fc28756dc4ab	{}
17ab4b3e-e0c2-4e74-95b6-35a79e3413ab	profile-pictures	.emptyFolderPlaceholder	\N	2025-04-25 05:44:49.092201+00	2025-04-25 05:44:49.092201+00	2025-04-25 05:44:49.092201+00	{"eTag": "\\"d41d8cd98f00b204e9800998ecf8427e\\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T05:44:50.000Z", "contentLength": 0, "httpStatusCode": 200}	3c3e76d0-b0e6-4878-80e9-9e926f5ea406	\N	{}
e0ced652-cc8a-44bb-875d-a6f96aa15f72	profile-pictures	b3f42013-85ab-406b-b823-89ab1da60b82/perfil.jpg	\N	2025-04-25 05:45:14.433594+00	2025-04-25 05:45:25.768952+00	2025-04-25 05:45:14.433594+00	{"eTag": "\\"3be5df47860e8e3fd1c71d783a87d471\\"", "size": 120310, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T05:45:26.000Z", "contentLength": 120310, "httpStatusCode": 200}	5b0e88dd-f8e0-4820-a5b1-4fef816e4ab0	\N	\N
43d45d96-2775-413e-8db0-6efb450bb075	documentos	7dfad126-2905-431a-829b-fcae851fe102/Data-Backup-Plan-Template_.docx-1.pdf	7dfad126-2905-431a-829b-fcae851fe102	2025-04-25 05:49:08.71233+00	2025-04-25 05:49:08.71233+00	2025-04-25 05:49:08.71233+00	{"eTag": "\\"45ed5302fdcf37830caf98189e96630f\\"", "size": 375174, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T05:49:09.000Z", "contentLength": 375174, "httpStatusCode": 200}	20f3222f-b16a-4ec1-8014-cfc5d88c82dc	7dfad126-2905-431a-829b-fcae851fe102	{}
787b268b-9805-4080-a958-a9bd6f0363c5	documentos	06e8e948-5dd3-4b5f-b314-25fa5cd5893b/Pathexplorer.pdf	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	2025-04-24 05:22:22.855726+00	2025-04-25 05:53:33.293632+00	2025-04-24 05:22:22.855726+00	{"eTag": "\\"33fe4788feab92ac37048e015d2dc97b\\"", "size": 3418655, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T05:53:34.000Z", "contentLength": 3418655, "httpStatusCode": 200}	f0e19475-8e05-4d53-b449-c977bc3c73f7	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	{}
531e4efe-ef63-4719-a37e-1b5630e6ede4	profile-pictures	b3f42013-85ab-406b-b823-89ab1da60b82/perfil	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-25 09:50:13.363572+00	2025-04-25 09:50:13.363572+00	2025-04-25 09:50:13.363572+00	{"eTag": "\\"141e3f8e613a194080f10b75ce8729de\\"", "size": 225263, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T09:50:14.000Z", "contentLength": 225263, "httpStatusCode": 200}	2e2d8c92-a8fd-4193-8a9b-9ac36215ced2	ff98b050-236d-4a28-8aea-567f03b9f3c3	{}
72d01e3c-eccd-4ab3-8d31-52835ff4e3f9	documentos	06e8e948-5dd3-4b5f-b314-25fa5cd5893b/ERD Proyecto.pdf	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	2025-04-25 10:41:15.170656+00	2025-04-25 10:41:15.170656+00	2025-04-25 10:41:15.170656+00	{"eTag": "\\"25fbc215e220257a3d3c93c613eb0715\\"", "size": 90939, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T10:41:16.000Z", "contentLength": 90939, "httpStatusCode": 200}	a0f4b149-ec72-4512-966d-e7661cd224c3	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	{}
852cc6c1-224e-494d-bff0-1a2df2e76877	profile-pictures	ff98b050-236d-4a28-8aea-567f03b9f3c3/perfil	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-25 09:55:21.201691+00	2025-04-25 12:12:54.074113+00	2025-04-25 09:55:21.201691+00	{"eTag": "\\"602357e6e3883660c880c07fb1faac77\\"", "size": 540268, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T12:12:54.000Z", "contentLength": 540268, "httpStatusCode": 200}	f9ec0ac0-76ed-4e09-9189-98d3ce6807f1	ff98b050-236d-4a28-8aea-567f03b9f3c3	{}
b46d1174-88bc-4fa8-b47a-dd5af162ff24	documentos	ff98b050-236d-4a28-8aea-567f03b9f3c3/Modelos de Agilidad.pdf	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-25 11:20:35.445332+00	2025-04-25 11:20:35.445332+00	2025-04-25 11:20:35.445332+00	{"eTag": "\\"71808cb2fda42c896770a490f5b66a45\\"", "size": 230613, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T11:20:36.000Z", "contentLength": 230613, "httpStatusCode": 200}	d0b4cf28-b13e-4fd5-9abc-0a6be72b2cad	ff98b050-236d-4a28-8aea-567f03b9f3c3	{}
f57e689f-2084-4862-917c-893a401d0afc	profile-pictures	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a/perfil	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-25 15:17:43.678033+00	2025-04-25 15:17:43.678033+00	2025-04-25 15:17:43.678033+00	{"eTag": "\\"529b591a5f03bed30437fb66e0cd24b5\\"", "size": 35891, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T15:17:44.000Z", "contentLength": 35891, "httpStatusCode": 200}	0dab4358-8dcd-4811-87e4-83b1949a16ca	7478c90f-4de7-494d-ae79-fc28756dc4ab	{}
54c97470-5fa6-4e1a-bf68-e93af5e5af52	profile-pictures	7478c90f-4de7-494d-ae79-fc28756dc4ab/perfil	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-25 15:34:41.433792+00	2025-04-25 15:34:41.433792+00	2025-04-25 15:34:41.433792+00	{"eTag": "\\"6d1f5b17c8ab601783daa9faeec96492\\"", "size": 76359, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T15:34:42.000Z", "contentLength": 76359, "httpStatusCode": 200}	fa6bff61-35d7-4f33-adb6-655d178e4896	7478c90f-4de7-494d-ae79-fc28756dc4ab	{}
95b16f4d-a301-4d6b-93d5-bee504d16bb5	profile-pictures	5f096705-11c3-49b1-b42c-d7bd17a75439/perfil	5f096705-11c3-49b1-b42c-d7bd17a75439	2025-04-25 18:25:15.951954+00	2025-04-25 18:25:15.951954+00	2025-04-25 18:25:15.951954+00	{"eTag": "\\"cd04f4b73b8abdf6507e869728bfe353\\"", "size": 114973, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-04-25T18:25:16.000Z", "contentLength": 114973, "httpStatusCode": 200}	d5be9d0a-3869-4aec-85c2-b80e32a94772	5f096705-11c3-49b1-b42c-d7bd17a75439	{}
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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 384, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
