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
00000000-0000-0000-0000-000000000000	9950b2e9-632f-42ff-b259-726ede4e408f	authenticated	authenticated	emirpuente31@gmail.com	$2a$10$0ZK6OsdkRn0vP77iccMbLu9LJXM8hD/nrIv6szdiU2tY9uyaUTvp6	2025-04-04 21:08:41.014941+00	\N		\N		\N			\N	2025-04-24 22:52:26.655556+00	{"provider": "email", "providers": ["email"]}	{"sub": "9950b2e9-632f-42ff-b259-726ede4e408f", "name": "Emir ", "role": "employee", "email": "emirpuente31@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 21:08:40.986911+00	2025-04-25 03:08:37.271298+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7478c90f-4de7-494d-ae79-fc28756dc4ab	authenticated	authenticated	a01741300@tec.mx	$2a$10$owQpDbpAjPcrHR7s7B0MWOlIDVtRxarymDgdjSh7gohAN3B6cm8GO	2025-04-03 07:26:01.05692+00	\N		\N		\N			\N	2025-04-25 04:47:31.988487+00	{"provider": "email", "providers": ["email"]}	{"sub": "7478c90f-4de7-494d-ae79-fc28756dc4ab", "name": "rick", "role": "employee", "email": "a01741300@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-03 07:26:01.049841+00	2025-04-25 04:47:31.990935+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ff98b050-236d-4a28-8aea-567f03b9f3c3	authenticated	authenticated	rantonion2004@outlook.com	$2a$10$z/JTayFCOsYP7u9ubuQL9u6BdJ0xo3xZ6ndfh0/PsoLfeKx7kGUQC	2025-04-04 22:56:53.287928+00	\N		\N		\N			\N	2025-04-25 04:49:24.731795+00	{"provider": "email", "providers": ["email"]}	{"sub": "ff98b050-236d-4a28-8aea-567f03b9f3c3", "name": "Ramón Antonio Naranjo Sarmiento", "role": "employee", "email": "rantonion2004@outlook.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 22:56:53.278128+00	2025-04-25 04:49:24.734454+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	authenticated	authenticated	davidminirey04@gmail.com	$2a$10$TeZT5rMlteYWsjreun8va.hwqfF9kEzqnIMUXPDmQLhMnDfzbnfbO	2025-04-04 21:09:21.551978+00	\N		\N		\N			\N	2025-04-04 21:09:21.55618+00	{"provider": "email", "providers": ["email"]}	{"sub": "17be3a68-8d97-4557-85e8-8e8cc9ecbc13", "name": "david", "role": "employee", "email": "davidminirey04@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 21:09:21.542561+00	2025-04-07 21:09:08.957296+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	dee4835c-764c-40fb-bf0b-3bff8a0457d4	authenticated	authenticated	naranjilandia2004@gmail.com	$2a$10$Tik8uk7nAlAadCnW1g/hzeYq8EvKZyGt1vFjR7lN.kMbfrVMDogam	2025-04-04 22:40:28.570105+00	\N		\N		\N			\N	2025-04-04 22:42:21.387227+00	{"provider": "email", "providers": ["email"]}	{"sub": "dee4835c-764c-40fb-bf0b-3bff8a0457d4", "name": "Pancho Naranjas", "role": "employee", "email": "naranjilandia2004@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 22:40:28.547229+00	2025-04-04 22:42:21.389543+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c3886a9b-c360-4fec-b16d-058747789ee2	authenticated	authenticated	xnhs@gmail.com	$2a$10$/QtdK4HWS1q5ro4jAQfl1.yHOM/Pa9N6qisvygjDmibfsWZ8bJ2fW	2025-04-04 23:16:23.82409+00	\N		\N		\N			\N	2025-04-04 23:16:23.828387+00	{"provider": "email", "providers": ["email"]}	{"sub": "c3886a9b-c360-4fec-b16d-058747789ee2", "name": "aksc", "role": "employee", "email": "xnhs@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 23:16:23.810339+00	2025-04-04 23:16:23.83311+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9d6ddaee-5f7c-4cef-8705-6db6a8d11109	authenticated	authenticated	yi@gmail.com	$2a$10$YejIlid.nPj3l92KfHe3yOC6SPGbgX1uj3HJ4TsPFexbIIwLiCy/a	2025-04-04 23:08:43.133554+00	\N		\N		\N			\N	2025-04-04 23:08:43.138398+00	{"provider": "email", "providers": ["email"]}	{"sub": "9d6ddaee-5f7c-4cef-8705-6db6a8d11109", "name": "yi", "role": "employee", "email": "yi@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-04 23:08:43.123322+00	2025-04-04 23:08:43.144236+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	564b41de-e4a1-4e56-bff7-c0681abc0718	authenticated	authenticated	a01198676@tec.mx	$2a$10$OWdlCJDTVT2YUv65UgEuIubEYL9cPUJ.vq.1hmBC8poIp/M3Jh4wq	2025-04-04 00:05:14.081829+00	\N		\N		\N			\N	2025-04-04 08:37:41.63076+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-04-04 00:05:14.078028+00	2025-04-25 00:24:17.630345+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7dfad126-2905-431a-829b-fcae851fe102	authenticated	authenticated	a01722728@tec.mx	$2a$10$fHgy1ulquoZVKjgjGIMgEuPLZytPHDv0KCKtQ0FPmYxwVgtSvPvlm	2025-04-07 21:40:35.123375+00	\N		\N		\N			\N	2025-04-25 05:12:12.066685+00	{"provider": "email", "providers": ["email"]}	{"sub": "7dfad126-2905-431a-829b-fcae851fe102", "name": "David", "role": "employee", "email": "a01722728@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-07 21:40:35.104179+00	2025-04-25 05:12:12.069687+00	\N	\N			\N		0	\N		\N	f	\N	f
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
00000000-0000-0000-0000-000000000000	b5d11271-9904-408a-b5ee-ae67ebda0586	authenticated	authenticated	empleado@g.com	$2a$10$uiF1AvqbRS5zkYaWNsP27eMoFt91dKiAU2F8KO0hueqw1lpQTMVxm	2025-04-11 20:43:47.41649+00	\N		\N		\N			\N	2025-04-11 22:07:31.734798+00	{"provider": "email", "providers": ["email"]}	{"sub": "b5d11271-9904-408a-b5ee-ae67ebda0586", "name": "Empleado", "role": "employee", "email": "empleado@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-11 20:43:47.388919+00	2025-04-11 23:05:56.154265+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	44339363-8791-433b-93d4-93642c90c69a	authenticated	authenticated	test03@g.com	$2a$10$yr7SeUi8xCyKVIwU2xZl3ulsEMAyeXDbMJ5.PWMM6xrdTtKtyTuUa	2025-04-09 02:43:16.958842+00	\N		\N		\N			\N	2025-04-09 02:43:16.963144+00	{"provider": "email", "providers": ["email"]}	{"sub": "44339363-8791-433b-93d4-93642c90c69a", "name": "Test03", "role": "employee", "email": "test03@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-09 02:43:16.947668+00	2025-04-10 04:17:48.47796+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	b314f0e1-5f44-48a5-9a99-30387795843c	authenticated	authenticated	test02@g.com	$2a$10$l6p6QKW7IMOsoV5oRdPGc.DBfPgldJ4qc/27GsVCQc/qJIX.KHeNO	2025-04-09 02:41:41.992356+00	\N		\N		\N			\N	2025-04-09 02:41:41.995967+00	{"provider": "email", "providers": ["email"]}	{"sub": "b314f0e1-5f44-48a5-9a99-30387795843c", "name": "wd", "role": "employee", "email": "test02@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-09 02:41:41.983233+00	2025-04-09 02:41:41.997708+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9cdc8f90-0c14-4d94-bfba-45c371b30735	authenticated	authenticated	zy2@gmail.com	$2a$10$YQmpgGwlzy8qi2u6ZmK6/eSDQJ3CcloWFQaUCOn8aKyRSHImvkEbS	2025-04-08 20:32:52.796246+00	\N		\N		\N			\N	2025-04-08 20:32:52.800996+00	{"provider": "email", "providers": ["email"]}	{"sub": "9cdc8f90-0c14-4d94-bfba-45c371b30735", "name": "zy2", "role": "employee", "email": "zy2@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-04-08 20:32:52.780624+00	2025-04-09 02:31:54.262983+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	53080ade-33ee-4342-ae5e-9683f4368b6a	authenticated	authenticated	peoplelead@g.com	$2a$10$aW/r71TqAgi2l852Esf9NOBpuL6.J0y4gpCQ/ttlLXdEL2GT2k3SK	2025-04-10 19:43:55.533727+00	\N		\N		\N			\N	2025-04-10 19:43:55.538407+00	{"provider": "email", "providers": ["email"]}	{"sub": "53080ade-33ee-4342-ae5e-9683f4368b6a", "name": "people lead", "role": "employee", "email": "peoplelead@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-10 19:43:55.518123+00	2025-04-10 19:43:55.545164+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	authenticated	authenticated	amogus@a.com	$2a$10$rblhxg9hl4GhrXcEu1rKZOTdEu.9NzxDUcYywG0w5IwNtX/wvopSC	2025-04-10 23:00:20.356623+00	\N		\N		\N			\N	2025-04-10 23:00:47.563316+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-04-10 23:00:20.331404+00	2025-04-22 22:23:23.441659+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0475f20b-25ce-485e-95cc-bd729859637d	authenticated	authenticated	talent@g.com	$2a$10$nKKUJry3UuKdlqJA43TdwOxSlp7cKft/yNyKBArA/OE0jMBTf.Rgy	2025-04-10 19:44:53.873404+00	\N		\N		\N			\N	2025-04-10 19:44:53.877978+00	{"provider": "email", "providers": ["email"]}	{"sub": "0475f20b-25ce-485e-95cc-bd729859637d", "name": "Talent lead", "role": "employee", "email": "talent@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-10 19:44:53.86637+00	2025-04-10 19:44:53.88225+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7ff2a62c-ef30-4c1e-8465-57ada3bb6897	authenticated	authenticated	liz@g.com	$2a$10$ltlPeLxcvm.PycXtPnPImu9o3hLFA8uTtFaOVx5//8l2P2HqUGpke	2025-04-23 18:12:12.213554+00	\N		\N		\N			\N	2025-04-23 18:12:12.221589+00	{"provider": "email", "providers": ["email"]}	{"sub": "7ff2a62c-ef30-4c1e-8465-57ada3bb6897", "name": "Lizeth", "role": "employee", "email": "liz@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-23 18:12:12.181848+00	2025-04-23 18:12:12.230377+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	412b6cda-4dbd-4bec-832e-1509eaf56414	authenticated	authenticated	capability@g.com	$2a$10$LaxMsWYl1EGCiOZG.vK.TOvTh7YbAkny4JO/BFBeiHD/hlpD3e1HO	2025-04-10 19:35:38.51439+00	\N		\N		\N			\N	2025-04-25 04:12:54.982521+00	{"provider": "email", "providers": ["email"]}	{"sub": "412b6cda-4dbd-4bec-832e-1509eaf56414", "name": "Capability", "role": "employee", "email": "capability@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-10 19:35:38.501687+00	2025-04-25 04:12:54.995842+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	authenticated	authenticated	a01198327@tec.mx	$2a$10$Z0gTaKw2hnQak31fyiiUueXcW4ZRZE36PfLOg.VaCLiOQ.vyOaKeS	2025-04-22 23:07:34.362579+00	\N		\N		\N			\N	2025-04-24 22:00:20.494495+00	{"provider": "email", "providers": ["email"]}	{"sub": "06e8e948-5dd3-4b5f-b314-25fa5cd5893b", "name": "Isaac Sanchez", "role": "employee", "email": "a01198327@tec.mx", "email_verified": true, "phone_verified": false}	\N	2025-04-22 23:07:34.320006+00	2025-04-25 04:59:56.943561+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ef15530b-dd57-4e43-a6ab-a04aa7b3a979	authenticated	authenticated	caso@g.com	$2a$10$.IaSZvTiN2nMhoDCELRnUOpHEiMWW928X9sLwrgV.aW8nXXfLFjcG	2025-04-24 20:08:51.677273+00	\N		\N		\N			\N	2025-04-24 20:08:51.684264+00	{"provider": "email", "providers": ["email"]}	{"sub": "ef15530b-dd57-4e43-a6ab-a04aa7b3a979", "name": "caso1", "role": "employee", "email": "caso@g.com", "email_verified": true, "phone_verified": false}	\N	2025-04-24 20:08:51.645196+00	2025-04-25 04:44:24.43726+00	\N	\N			\N		0	\N		\N	f	\N	f
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
d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	{"sub": "d2f63e49-f24d-4cda-8ff8-9056d6ee4bea", "email": "amogus@a.com", "email_verified": false, "phone_verified": false}	email	2025-04-10 23:00:20.3482+00	2025-04-10 23:00:20.348264+00	2025-04-10 23:00:20.348264+00	d895eed3-b5c1-40e6-8958-049662f2f095
b5d11271-9904-408a-b5ee-ae67ebda0586	b5d11271-9904-408a-b5ee-ae67ebda0586	{"sub": "b5d11271-9904-408a-b5ee-ae67ebda0586", "name": "Empleado", "role": "employee", "email": "empleado@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-11 20:43:47.40557+00	2025-04-11 20:43:47.405624+00	2025-04-11 20:43:47.405624+00	6bd1e366-6d88-4fea-a8f8-1cf099c00f23
06e8e948-5dd3-4b5f-b314-25fa5cd5893b	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	{"sub": "06e8e948-5dd3-4b5f-b314-25fa5cd5893b", "name": "Isaac Sanchez", "role": "employee", "email": "a01198327@tec.mx", "email_verified": false, "phone_verified": false}	email	2025-04-22 23:07:34.353862+00	2025-04-22 23:07:34.35393+00	2025-04-22 23:07:34.35393+00	2e7598a1-7b0c-4b83-8d44-113941e08cbd
7ff2a62c-ef30-4c1e-8465-57ada3bb6897	7ff2a62c-ef30-4c1e-8465-57ada3bb6897	{"sub": "7ff2a62c-ef30-4c1e-8465-57ada3bb6897", "name": "Lizeth", "role": "employee", "email": "liz@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-23 18:12:12.204382+00	2025-04-23 18:12:12.204441+00	2025-04-23 18:12:12.204441+00	5bad5c29-17c7-4c30-afc4-3f6dc687c93c
ef15530b-dd57-4e43-a6ab-a04aa7b3a979	ef15530b-dd57-4e43-a6ab-a04aa7b3a979	{"sub": "ef15530b-dd57-4e43-a6ab-a04aa7b3a979", "name": "caso1", "role": "employee", "email": "caso@g.com", "email_verified": false, "phone_verified": false}	email	2025-04-24 20:08:51.669124+00	2025-04-24 20:08:51.66918+00	2025-04-24 20:08:51.66918+00	26aeec0e-3ed2-4d0d-9f1a-2ab347ef8e1a
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
84e0910f-f760-4ea4-9e2a-9e1962065a10	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-25 04:49:24.731865+00	2025-04-25 04:49:24.731865+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	187.190.181.239	\N
733241d6-054d-4e3e-bf06-310dca382bc5	31f3a821-66c2-42eb-8def-2880197e8a7d	2025-04-03 06:26:33.266108+00	2025-04-03 06:26:33.266108+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	189.203.91.63	\N
13e2f0a4-5a4f-4f0e-b465-91837ab82d2c	a57aab4d-0c82-479b-91cd-2502a0c7dac8	2025-04-07 20:53:47.20299+00	2025-04-07 20:53:47.20299+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.220	\N
bec1f936-4b9c-497a-9455-f341b87dbb56	b47428a9-2529-4a4a-b02f-5c42648e88a9	2025-04-03 19:47:21.368628+00	2025-04-03 22:55:03.195922+00	\N	aal1	\N	2025-04-03 22:55:03.195843	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
e653fdea-2a0c-43ed-a035-03f67dea0255	ecdca837-6a64-41a9-9642-196ffac92612	2025-04-03 23:35:30.817062+00	2025-04-03 23:35:30.817062+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
347e93a6-93fb-4ec7-aea7-622a5f6e7593	ecdca837-6a64-41a9-9642-196ffac92612	2025-04-03 23:36:09.87059+00	2025-04-03 23:36:09.87059+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.192	\N
7a31d097-c55a-4018-b588-4fe9d1c7504f	564b41de-e4a1-4e56-bff7-c0681abc0718	2025-04-04 00:29:14.802993+00	2025-04-04 00:29:14.802993+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0	131.178.102.136	\N
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
7076da94-128a-49a0-83ec-44cbdf37a44b	2eadd525-41bd-4c5d-9073-faf9c6b91714	2025-04-07 23:24:17.05751+00	2025-04-07 23:24:17.05751+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
20c3aa32-bdab-4507-ba93-277b988c5e88	7dfad126-2905-431a-829b-fcae851fe102	2025-04-07 21:41:29.274689+00	2025-04-07 23:20:37.317303+00	\N	aal1	\N	2025-04-07 23:20:37.317234	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.196	\N
23d60cde-7e1f-4b09-9fc5-c1ee1aa38707	6eb32f88-231e-4237-9f93-6689a94b624d	2025-04-07 23:22:47.108651+00	2025-04-07 23:22:47.108651+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
bd306676-f60a-4666-a038-5c80d3c4efe7	7dfad126-2905-431a-829b-fcae851fe102	2025-04-07 23:35:55.72285+00	2025-04-10 19:39:44.929133+00	\N	aal1	\N	2025-04-10 19:39:44.929063	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
a1291826-8325-46d8-a380-7f1b5910c5e4	31fbe58a-c798-401a-b2aa-c06726293956	2025-04-07 23:30:10.222085+00	2025-04-07 23:30:10.222085+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
a82dfff5-488c-451d-9b51-8489f373de8f	0e41703f-9367-446f-ab66-0c5477edda65	2025-04-07 23:34:08.082589+00	2025-04-07 23:34:08.082589+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
130e0fb5-ad02-4b04-a09f-718a2beb5096	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-07 21:46:59.963512+00	2025-04-22 04:02:04.210915+00	\N	aal1	\N	2025-04-22 04:02:04.209638	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	187.190.181.239	\N
12276b70-03e0-4dd9-b0bb-44f782a60260	a004e928-2b22-4749-ad53-9232297705be	2025-04-07 23:37:10.570256+00	2025-04-07 23:37:10.570256+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
a678115e-7c12-4f2c-9ec9-36544e9c8552	204b4114-7454-40dd-afd4-d4521f0c2558	2025-04-08 00:06:55.667682+00	2025-04-08 00:06:55.667682+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
686747a6-69ff-4e0e-abea-f5c8eeba426e	392c88d5-a2c3-4a14-88d1-2d84bc8133c5	2025-04-08 00:08:41.302542+00	2025-04-08 00:08:41.302542+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
8e77a1a1-4e5c-430e-8252-cf7b0865629f	37a795b1-0a19-41ca-a09c-805dc258ac38	2025-04-08 00:16:29.329073+00	2025-04-08 00:16:29.329073+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
d7a619b3-b98c-4d7e-9b83-cfbac0790254	7dfad126-2905-431a-829b-fcae851fe102	2025-04-25 05:12:11.290045+00	2025-04-25 05:12:11.290045+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	187.190.18.98	\N
9579011c-9e5f-43f1-95bf-13f4a050844f	a0a40b5c-c8be-40f1-ae42-d8bb32677c8e	2025-04-08 00:23:45.397286+00	2025-04-08 00:23:45.397286+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.212	\N
e788cb23-0f42-46f7-8493-84f661ace050	0a38c26c-3a86-42cb-b39b-c9c76848f0e5	2025-04-08 00:26:00.023577+00	2025-04-08 20:24:54.295482+00	\N	aal1	\N	2025-04-08 20:24:54.295393	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.212	\N
abe4b140-f120-46e6-a9dc-6dd324bd255c	577146a4-87b1-4f34-9bb1-824140ff4c54	2025-04-08 20:27:24.919354+00	2025-04-08 20:27:24.919354+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.212	\N
caeb9bac-6bbd-474d-82b2-a9ca1803d68a	809bf7bd-14ec-4553-9e37-90a697149799	2025-04-08 20:27:54.472835+00	2025-04-08 20:27:54.472835+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.212	\N
d89a2f1a-2a1a-42b6-9f78-e9b6ddaaa2ee	7dfad126-2905-431a-829b-fcae851fe102	2025-04-25 05:12:12.066764+00	2025-04-25 05:12:12.066764+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	187.190.18.98	\N
4fe18208-4e51-4082-8856-293cc6493bb0	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 19:39:48.667872+00	2025-04-10 19:39:48.667872+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
e747ee9b-2fab-4953-bab9-f8ea6b6c8e05	53080ade-33ee-4342-ae5e-9683f4368b6a	2025-04-10 19:43:55.538489+00	2025-04-10 19:43:55.538489+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
3a053151-9528-4862-ab12-4f5fb3fbd0dc	9cdc8f90-0c14-4d94-bfba-45c371b30735	2025-04-08 20:32:52.80107+00	2025-04-09 02:31:54.264955+00	\N	aal1	\N	2025-04-09 02:31:54.264877	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
72089df5-7e88-4566-850c-b27ee357a286	2ccb7762-72c7-4aeb-93ab-5b628ea330f3	2025-04-09 02:40:56.5713+00	2025-04-09 02:40:56.5713+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
c3ce003f-8f43-4d15-8923-09412fcfc2e0	b314f0e1-5f44-48a5-9a99-30387795843c	2025-04-09 02:41:41.996063+00	2025-04-09 02:41:41.996063+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
090ea1cc-ac4d-405f-9a26-c1112daf2318	0475f20b-25ce-485e-95cc-bd729859637d	2025-04-10 19:44:53.878069+00	2025-04-10 19:44:53.878069+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
5bfb37df-b486-4f5f-a0a6-4a33f371866a	44339363-8791-433b-93d4-93642c90c69a	2025-04-09 02:43:16.963213+00	2025-04-10 04:17:48.480492+00	\N	aal1	\N	2025-04-10 04:17:48.48042	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
fff2c5c9-c6c6-44e3-8fec-a0b85fab5581	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-10 01:20:04.572385+00	2025-04-10 19:45:03.363222+00	\N	aal1	\N	2025-04-10 19:45:03.363155	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	131.178.102.172	\N
574dcacd-7698-41ca-8630-1203261e9df3	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 19:54:09.015359+00	2025-04-10 19:54:09.015359+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
5aa6ea21-37bf-4d10-b5f5-067f24ca2657	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 19:54:09.205351+00	2025-04-10 19:54:09.205351+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
9e771491-91bd-45c4-8f58-923d75a54e9d	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 21:36:53.265549+00	2025-04-10 21:36:53.265549+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
2c7ce081-da33-4144-aa5a-1b51a7b68d8f	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	2025-04-10 19:30:06.798991+00	2025-04-10 19:30:06.798991+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
422907f0-37fb-4c98-9f77-58011487397d	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 19:54:10.937667+00	2025-04-10 21:09:59.528446+00	\N	aal1	\N	2025-04-10 21:09:59.528373	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
ed890fa7-a63a-44e5-9ac1-4af27b980869	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 21:18:46.086103+00	2025-04-10 21:18:46.086103+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.200	\N
4c9d2a2f-2119-4f63-ae49-24cb1d31ceff	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-10 19:45:03.962924+00	2025-04-22 22:01:35.855226+00	\N	aal1	\N	2025-04-22 22:01:35.85515	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	131.178.102.172	\N
6f11687f-212a-424e-914a-bb82c1ef01f9	7dfad126-2905-431a-829b-fcae851fe102	2025-04-10 21:36:54.386627+00	2025-04-13 04:56:47.871742+00	\N	aal1	\N	2025-04-13 04:56:47.87165	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	187.189.41.179	\N
610b311e-6abc-4269-98a9-60e35c694331	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	2025-04-22 23:09:11.30611+00	2025-04-25 04:59:56.946199+00	\N	aal1	\N	2025-04-25 04:59:56.946121	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.161.118.27	\N
382cbb2f-cb8a-483d-bd3b-f43f50756870	7dfad126-2905-431a-829b-fcae851fe102	2025-04-24 19:57:17.483535+00	2025-04-25 05:12:08.705818+00	\N	aal1	\N	2025-04-25 05:12:08.705752	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	187.190.18.98	\N
874209f2-651b-434a-b39d-862f816d4220	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	2025-04-10 23:00:47.563395+00	2025-04-22 22:23:23.443989+00	\N	aal1	\N	2025-04-22 22:23:23.44392	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.172	\N
0c22576f-da17-4493-9773-7a725bb34108	7dfad126-2905-431a-829b-fcae851fe102	2025-04-13 04:57:53.336453+00	2025-04-16 06:25:27.17692+00	\N	aal1	\N	2025-04-16 06:25:27.176429	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	187.190.176.179	\N
02fab783-8b00-4b26-9459-698e26d243fd	ff98b050-236d-4a28-8aea-567f03b9f3c3	2025-04-22 04:02:08.916017+00	2025-04-25 04:46:47.914586+00	\N	aal1	\N	2025-04-25 04:46:47.914492	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0	187.190.181.239	\N
7730bf04-fa95-4347-8dc9-eac5957f9420	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	2025-04-22 23:07:34.367767+00	2025-04-24 19:25:06.646857+00	\N	aal1	\N	2025-04-24 19:25:06.646792	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.200	\N
8dc2563d-ef58-4675-8d67-e40cc2b826c8	b5d11271-9904-408a-b5ee-ae67ebda0586	2025-04-11 20:43:47.423009+00	2025-04-11 21:42:04.561642+00	\N	aal1	\N	2025-04-11 21:42:04.561573	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
27c14cde-9f2d-443b-a6f4-03cf943f0b02	b5d11271-9904-408a-b5ee-ae67ebda0586	2025-04-11 21:46:42.552233+00	2025-04-11 21:46:42.552233+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
40b93ad2-ecd2-4d4e-952e-a0ee6c871a56	b5d11271-9904-408a-b5ee-ae67ebda0586	2025-04-11 22:07:31.736865+00	2025-04-11 23:05:56.157861+00	\N	aal1	\N	2025-04-11 23:05:56.157787	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.192	\N
1aaeccca-2b00-44cb-a6c4-b3c77552cb80	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	2025-04-24 19:37:24.547376+00	2025-04-24 19:37:24.547376+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.160	\N
0ca08ded-37fc-44a9-86fa-72a4f24781ac	7dfad126-2905-431a-829b-fcae851fe102	2025-04-13 04:57:51.543777+00	2025-04-13 04:57:51.543777+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	187.189.41.179	\N
6579dc73-8909-4098-ac46-b96e6b4081c8	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	2025-04-24 19:40:02.635847+00	2025-04-24 19:40:02.635847+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.160	\N
95a3e82c-2f37-4601-bbd1-f0abb464d619	7dfad126-2905-431a-829b-fcae851fe102	2025-04-16 06:25:46.318248+00	2025-04-22 21:41:05.771679+00	\N	aal1	\N	2025-04-22 21:41:05.77161	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.208	\N
b4e0f780-29f4-442c-ab6d-50c9e8dd3c61	7dfad126-2905-431a-829b-fcae851fe102	2025-04-22 21:41:07.908253+00	2025-04-22 21:41:07.908253+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.208	\N
ff2ffc29-8f7b-4be5-8fa1-8bee545e0cc8	7dfad126-2905-431a-829b-fcae851fe102	2025-04-22 21:41:09.295904+00	2025-04-22 21:41:09.295904+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.208	\N
c6fe2736-fba9-4734-bffb-2b66909d6225	7dfad126-2905-431a-829b-fcae851fe102	2025-04-22 21:56:59.689872+00	2025-04-22 21:56:59.689872+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.208	\N
1f9d16ca-22c7-4574-8dda-73e54e7d7cd2	7ff2a62c-ef30-4c1e-8465-57ada3bb6897	2025-04-23 18:12:12.221661+00	2025-04-23 18:12:12.221661+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
c6efa894-a00f-4d8f-8e9f-d5d13662571a	564b41de-e4a1-4e56-bff7-c0681abc0718	2025-04-04 08:37:41.630831+00	2025-04-25 00:24:17.632104+00	\N	aal1	\N	2025-04-25 00:24:17.632028	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	131.178.102.164	\N
95d5610c-95ee-4627-91e7-98b3fc2b9926	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-22 22:01:37.737011+00	2025-04-24 22:52:25.885203+00	\N	aal1	\N	2025-04-24 22:52:25.884499	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	131.178.102.148	\N
37d900bb-a5fa-4045-bd48-d5ab94643b17	7dfad126-2905-431a-829b-fcae851fe102	2025-04-22 21:57:01.114884+00	2025-04-24 19:57:12.656788+00	\N	aal1	\N	2025-04-24 19:57:12.656715	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0	131.178.102.208	\N
9551b715-9dae-498b-b6cc-e5b31d13fb0c	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	2025-04-24 20:25:30.070834+00	2025-04-24 22:00:10.671672+00	\N	aal1	\N	2025-04-24 22:00:10.671605	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	131.178.102.160	\N
5ad7c46a-838c-41d1-b4e8-ca77a4587e49	9950b2e9-632f-42ff-b259-726ede4e408f	2025-04-24 22:52:26.656995+00	2025-04-25 03:08:37.274514+00	\N	aal1	\N	2025-04-25 03:08:37.273652	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0 (Edition ASUS)	201.173.65.96	\N
0499a9ef-1783-4f29-b7fa-3e277836e66e	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	2025-04-24 22:00:20.495724+00	2025-04-25 03:30:26.419794+00	\N	aal1	\N	2025-04-25 03:30:26.419729	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.161.118.27	\N
abd391d5-a2f8-412a-8db9-3b196102f97d	ef15530b-dd57-4e43-a6ab-a04aa7b3a979	2025-04-24 20:08:51.68434+00	2025-04-25 04:44:24.438776+00	\N	aal1	\N	2025-04-25 04:44:24.438694	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
e0b7bd0f-80ae-41f8-85e0-c44a337b0502	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-25 04:44:37.035577+00	2025-04-25 04:44:37.035577+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
9ae1d074-b493-4c14-934d-87ee06b7db31	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-25 04:47:31.988559+00	2025-04-25 04:47:31.988559+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	187.190.181.239	\N
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
733241d6-054d-4e3e-bf06-310dca382bc5	2025-04-03 06:26:33.269406+00	2025-04-03 06:26:33.269406+00	password	b7f0a3c8-7397-47fd-9f8e-0f6205c7f171
bec1f936-4b9c-497a-9455-f341b87dbb56	2025-04-03 19:47:21.371791+00	2025-04-03 19:47:21.371791+00	password	3fc7ebb2-831e-4d10-bf25-63b353d9e558
e653fdea-2a0c-43ed-a035-03f67dea0255	2025-04-03 23:35:30.825701+00	2025-04-03 23:35:30.825701+00	otp	8d86d58f-d0ec-47c6-866e-681e007393db
347e93a6-93fb-4ec7-aea7-622a5f6e7593	2025-04-03 23:36:09.872504+00	2025-04-03 23:36:09.872504+00	password	2dd560e1-c353-4280-91eb-2f0298a7d9a6
7a31d097-c55a-4018-b588-4fe9d1c7504f	2025-04-04 00:29:14.808751+00	2025-04-04 00:29:14.808751+00	otp	2f4e832b-120e-43ac-9034-ac307eac9168
f45c7343-bb68-4116-9c42-51817358d703	2025-04-04 00:30:29.016181+00	2025-04-04 00:30:29.016181+00	password	24554595-efbf-4615-b906-8f49dc62d729
0e58ad5a-2204-4502-9aee-d1d433ca2f8b	2025-04-04 08:03:29.671047+00	2025-04-04 08:03:29.671047+00	password	cb109a87-c0f6-4a37-a0dc-77c58d7642b8
c6efa894-a00f-4d8f-8e9f-d5d13662571a	2025-04-04 08:37:41.638259+00	2025-04-04 08:37:41.638259+00	password	b5dde31a-0eb3-4302-90e2-0711b34d4301
d7992f80-8d49-452e-b502-35b830be963a	2025-04-04 21:09:21.558885+00	2025-04-04 21:09:21.558885+00	password	ef26e289-a165-4e91-9e58-340587167dfb
357ed060-0e3f-4905-b8b1-62f07e7bfb2e	2025-04-04 21:09:45.906584+00	2025-04-04 21:09:45.906584+00	otp	fb8d924a-2c22-4659-8986-bc815ed97329
4fca3c70-db1b-4df9-b886-2128414bfff2	2025-04-04 21:10:08.115154+00	2025-04-04 21:10:08.115154+00	password	e6087eb8-8478-44ec-81a1-9f1129f8ebe2
2de106ed-45b8-48bc-99f9-7a8b7dbbe143	2025-04-04 22:41:50.107205+00	2025-04-04 22:41:50.107205+00	otp	0300a4ef-a9b7-432a-aeaa-8483b9714a20
cb0ef6db-3928-456b-bb08-02a7817dc531	2025-04-04 22:42:21.389932+00	2025-04-04 22:42:21.389932+00	password	e3f7c1a4-71c7-45e2-a541-3d79bbae22ef
a84d8879-7ad4-40b4-93e1-2a4d44f64e1c	2025-04-04 22:57:17.54153+00	2025-04-04 22:57:17.54153+00	otp	385fc376-2e21-418c-abfc-30ca007f5392
85c6b0e3-9366-4ce2-b77b-25026aa62922	2025-04-04 22:57:33.039175+00	2025-04-04 22:57:33.039175+00	password	03dfb4b8-5ad7-4714-899d-f9144ee9c638
48596cd3-600f-4b74-9120-649bd3f269d5	2025-04-04 23:08:43.144712+00	2025-04-04 23:08:43.144712+00	password	15203264-6003-48a6-b87a-7ed2322e8553
869e3abf-7e8a-47f2-a832-6ca24973903e	2025-04-04 23:16:23.834214+00	2025-04-04 23:16:23.834214+00	password	086bc4ea-14f0-42e1-b067-d96bc1942791
88c69472-f73c-4cd4-a282-29729ccfacfb	2025-04-07 06:04:47.011268+00	2025-04-07 06:04:47.011268+00	password	82c96b81-9010-4779-8f5b-bb61e12cb632
3b4835ff-150d-411c-9163-e901122cd92c	2025-04-07 06:11:17.111858+00	2025-04-07 06:11:17.111858+00	password	cfa026dc-7851-4350-9429-9d0e27b896b9
e356093c-d48d-4593-ad76-c0f8f198215e	2025-04-07 06:18:07.79076+00	2025-04-07 06:18:07.79076+00	password	fd20aca4-0fcd-4ef0-8de7-091f2c91255d
13e2f0a4-5a4f-4f0e-b465-91837ab82d2c	2025-04-07 20:53:47.205781+00	2025-04-07 20:53:47.205781+00	password	d094e455-b88b-4afe-b396-7234c5c4c398
48c8598d-bb2a-43f1-9d25-36462d3e8c76	2025-04-07 21:40:35.134844+00	2025-04-07 21:40:35.134844+00	password	133d421c-c91c-4f1d-a3c7-7185a835c517
20c3aa32-bdab-4507-ba93-277b988c5e88	2025-04-07 21:41:29.281469+00	2025-04-07 21:41:29.281469+00	password	85174375-1e1e-4b01-b386-9d2473b4bd0d
130e0fb5-ad02-4b04-a09f-718a2beb5096	2025-04-07 21:46:59.967573+00	2025-04-07 21:46:59.967573+00	password	a1897dff-b5ad-43c7-a655-79d462c6acd6
97af4dbc-bc49-480b-a851-142d4eaaf6df	2025-04-07 21:49:41.440583+00	2025-04-07 21:49:41.440583+00	password	80bc0682-f49a-4db6-bcad-4feaa15f8fa0
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
2c7ce081-da33-4144-aa5a-1b51a7b68d8f	2025-04-10 19:30:06.808082+00	2025-04-10 19:30:06.808082+00	password	a63afc39-cb32-44d7-baa1-a05c1f8658a9
4fe18208-4e51-4082-8856-293cc6493bb0	2025-04-10 19:39:48.669953+00	2025-04-10 19:39:48.669953+00	password	70e419f4-e462-4775-b2dc-8bb6bd4c4d36
e747ee9b-2fab-4953-bab9-f8ea6b6c8e05	2025-04-10 19:43:55.545691+00	2025-04-10 19:43:55.545691+00	password	2cb5f217-3141-4175-bc58-0a0d538a5976
090ea1cc-ac4d-405f-9a26-c1112daf2318	2025-04-10 19:44:53.882739+00	2025-04-10 19:44:53.882739+00	password	c65fe9c8-c52b-4ab2-8b61-e43941f72a96
4c9d2a2f-2119-4f63-ae49-24cb1d31ceff	2025-04-10 19:45:03.965949+00	2025-04-10 19:45:03.965949+00	password	7606d69b-0f42-4e79-9107-b84da1ead10e
574dcacd-7698-41ca-8630-1203261e9df3	2025-04-10 19:54:09.023541+00	2025-04-10 19:54:09.023541+00	password	d48b912a-c628-4a64-aba9-c8292fdccbe4
5aa6ea21-37bf-4d10-b5f5-067f24ca2657	2025-04-10 19:54:09.207281+00	2025-04-10 19:54:09.207281+00	password	0d8b6f38-6347-4415-bcba-ad6371592994
422907f0-37fb-4c98-9f77-58011487397d	2025-04-10 19:54:10.940356+00	2025-04-10 19:54:10.940356+00	password	ebafc786-3777-4abf-b188-c861d59f9d78
ed890fa7-a63a-44e5-9ac1-4af27b980869	2025-04-10 21:18:46.097936+00	2025-04-10 21:18:46.097936+00	password	e3764e07-102e-4999-b87e-bc60bd5e8e64
9e771491-91bd-45c4-8f58-923d75a54e9d	2025-04-10 21:36:53.274389+00	2025-04-10 21:36:53.274389+00	password	7ca36278-9a38-4017-ad42-d3b1e2e30a3b
6f11687f-212a-424e-914a-bb82c1ef01f9	2025-04-10 21:36:54.388908+00	2025-04-10 21:36:54.388908+00	password	5dd9b75b-b34a-4d98-966f-d6615b679948
874209f2-651b-434a-b39d-862f816d4220	2025-04-10 23:00:47.574165+00	2025-04-10 23:00:47.574165+00	password	2f4f6c3c-fd19-4b0f-b48e-d5c08733da55
8dc2563d-ef58-4675-8d67-e40cc2b826c8	2025-04-11 20:43:47.433292+00	2025-04-11 20:43:47.433292+00	password	425b1b60-805e-40c8-b00d-bd188543bfae
27c14cde-9f2d-443b-a6f4-03cf943f0b02	2025-04-11 21:46:42.565902+00	2025-04-11 21:46:42.565902+00	password	8aa9d14c-2f18-4d2f-b3ef-bfa79ebc9734
40b93ad2-ecd2-4d4e-952e-a0ee6c871a56	2025-04-11 22:07:31.750256+00	2025-04-11 22:07:31.750256+00	password	a94ff51c-ae22-4af0-a267-bb774385cf71
0ca08ded-37fc-44a9-86fa-72a4f24781ac	2025-04-13 04:57:51.554777+00	2025-04-13 04:57:51.554777+00	password	d2f5c8df-33a8-4290-b8c8-76e79774e822
0c22576f-da17-4493-9773-7a725bb34108	2025-04-13 04:57:53.338335+00	2025-04-13 04:57:53.338335+00	password	a254e6d2-ae97-4659-a770-d18181c3385e
95a3e82c-2f37-4601-bbd1-f0abb464d619	2025-04-16 06:25:46.327539+00	2025-04-16 06:25:46.327539+00	password	85e04f4a-5821-469e-bac9-acab926cc3c9
02fab783-8b00-4b26-9459-698e26d243fd	2025-04-22 04:02:08.927171+00	2025-04-22 04:02:08.927171+00	password	5a95203e-8259-4379-8fb7-8db1249fbbae
b4e0f780-29f4-442c-ab6d-50c9e8dd3c61	2025-04-22 21:41:07.912338+00	2025-04-22 21:41:07.912338+00	password	8c970539-bb8f-44bc-9b8a-1ae739c74b27
ff2ffc29-8f7b-4be5-8fa1-8bee545e0cc8	2025-04-22 21:41:09.301518+00	2025-04-22 21:41:09.301518+00	password	9fac9805-80bf-4192-8873-33a225e90615
c6fe2736-fba9-4734-bffb-2b66909d6225	2025-04-22 21:56:59.70291+00	2025-04-22 21:56:59.70291+00	password	bba5713c-9ff5-4ac3-97ce-a94ef827432c
37d900bb-a5fa-4045-bd48-d5ab94643b17	2025-04-22 21:57:01.117474+00	2025-04-22 21:57:01.117474+00	password	a22bc962-cd7a-489e-91aa-49ba07027cd9
95d5610c-95ee-4627-91e7-98b3fc2b9926	2025-04-22 22:01:37.741898+00	2025-04-22 22:01:37.741898+00	password	92a92ee8-4aca-4677-8186-0a04e0098ca1
7730bf04-fa95-4347-8dc9-eac5957f9420	2025-04-22 23:07:34.37527+00	2025-04-22 23:07:34.37527+00	password	3edf6051-7f06-485e-86e6-e8f20069024c
610b311e-6abc-4269-98a9-60e35c694331	2025-04-22 23:09:11.309701+00	2025-04-22 23:09:11.309701+00	password	82f4d385-7974-49d8-ae7d-db0989fa3b14
1f9d16ca-22c7-4574-8dda-73e54e7d7cd2	2025-04-23 18:12:12.230877+00	2025-04-23 18:12:12.230877+00	password	e57051fb-cd6b-4e72-a557-a6e144e20425
1aaeccca-2b00-44cb-a6c4-b3c77552cb80	2025-04-24 19:37:24.558536+00	2025-04-24 19:37:24.558536+00	password	4aae7f47-d6c4-418d-88de-edcaea40d823
6579dc73-8909-4098-ac46-b96e6b4081c8	2025-04-24 19:40:02.638817+00	2025-04-24 19:40:02.638817+00	password	885846b6-4c64-4e8d-b064-f7c6134191c9
382cbb2f-cb8a-483d-bd3b-f43f50756870	2025-04-24 19:57:17.487903+00	2025-04-24 19:57:17.487903+00	password	697f780f-5225-4c19-92a0-8336958e5624
abd391d5-a2f8-412a-8db9-3b196102f97d	2025-04-24 20:08:51.687238+00	2025-04-24 20:08:51.687238+00	password	752ec056-846d-4ba0-ba89-51862d38c03d
9551b715-9dae-498b-b6cc-e5b31d13fb0c	2025-04-24 20:25:30.079569+00	2025-04-24 20:25:30.079569+00	password	babed35e-65a4-44f8-ab6a-350fcce07d2f
0499a9ef-1783-4f29-b7fa-3e277836e66e	2025-04-24 22:00:20.501822+00	2025-04-24 22:00:20.501822+00	password	c72bd827-c6e3-4289-8629-c45e5b615652
5ad7c46a-838c-41d1-b4e8-ca77a4587e49	2025-04-24 22:52:26.666865+00	2025-04-24 22:52:26.666865+00	password	d30c4dba-13cb-43ab-a448-b2cac471f1c7
e0b7bd0f-80ae-41f8-85e0-c44a337b0502	2025-04-25 04:44:37.041681+00	2025-04-25 04:44:37.041681+00	password	cd3ff734-6274-4402-9efb-9734d27f4b07
9ae1d074-b493-4c14-934d-87ee06b7db31	2025-04-25 04:47:31.99125+00	2025-04-25 04:47:31.99125+00	password	e8e90abc-c9ea-4dd7-ba48-6c6e622dd579
84e0910f-f760-4ea4-9e2a-9e1962065a10	2025-04-25 04:49:24.735114+00	2025-04-25 04:49:24.735114+00	password	2dd644e7-a628-4813-9717-fdd4ac814349
d7a619b3-b98c-4d7e-9b83-cfbac0790254	2025-04-25 05:12:11.295667+00	2025-04-25 05:12:11.295667+00	password	6ead7b73-55e5-4ac1-b578-e4c959b7eaec
d89a2f1a-2a1a-42b6-9f78-e9b6ddaaa2ee	2025-04-25 05:12:12.07002+00	2025-04-25 05:12:12.07002+00	password	19ecaa6d-f81d-477b-bc25-837e9219069f
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
00000000-0000-0000-0000-000000000000	325	7OuKtTyw2wVXII2_ox_l3w	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-25 04:49:24.733079+00	2025-04-25 04:49:24.733079+00	\N	84e0910f-f760-4ea4-9e2a-9e1962065a10
00000000-0000-0000-0000-000000000000	4	UBmlZVdbiqUVBZ1hO5Fjmg	31f3a821-66c2-42eb-8def-2880197e8a7d	f	2025-04-03 06:26:33.267101+00	2025-04-03 06:26:33.267101+00	\N	733241d6-054d-4e3e-bf06-310dca382bc5
00000000-0000-0000-0000-000000000000	18	wVa0nnaMXMpm6OEOpkmtng	b47428a9-2529-4a4a-b02f-5c42648e88a9	t	2025-04-03 19:47:21.369784+00	2025-04-03 21:56:20.65999+00	\N	bec1f936-4b9c-497a-9455-f341b87dbb56
00000000-0000-0000-0000-000000000000	19	netgtkIOGkdX7UZt-Z6tog	b47428a9-2529-4a4a-b02f-5c42648e88a9	t	2025-04-03 21:56:20.662307+00	2025-04-03 22:55:03.190798+00	wVa0nnaMXMpm6OEOpkmtng	bec1f936-4b9c-497a-9455-f341b87dbb56
00000000-0000-0000-0000-000000000000	21	f30JdpmOnafZsqrxH_3WQw	b47428a9-2529-4a4a-b02f-5c42648e88a9	f	2025-04-03 22:55:03.192733+00	2025-04-03 22:55:03.192733+00	netgtkIOGkdX7UZt-Z6tog	bec1f936-4b9c-497a-9455-f341b87dbb56
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
00000000-0000-0000-0000-000000000000	37	am_VJCwyFLnAX5WwLv-01A	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-04 09:36:23.562885+00	2025-04-07 19:48:17.52895+00	34rYNZvWRj6E3GxFpx8Fiw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	60	jZZpOHVRnqi0ypumiBRi7g	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-07 07:53:26.881374+00	2025-04-07 20:04:43.689383+00	Lwf2You1gau4bJjV9mRtfg	e356093c-d48d-4593-ad76-c0f8f198215e
00000000-0000-0000-0000-000000000000	42	QDhkKQQFgdMYIsVz7iiq9Q	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	t	2025-04-04 21:09:21.557608+00	2025-04-07 20:07:58.081337+00	\N	d7992f80-8d49-452e-b502-35b830be963a
00000000-0000-0000-0000-000000000000	62	zUkuejFgY0Q9dgCjf_VWaQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-07 19:48:17.531004+00	2025-04-07 20:46:47.173966+00	am_VJCwyFLnAX5WwLv-01A	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	68	IGxbem7yLVSJmxTwuixSMg	a57aab4d-0c82-479b-91cd-2502a0c7dac8	f	2025-04-07 20:53:47.20409+00	2025-04-07 20:53:47.20409+00	\N	13e2f0a4-5a4f-4f0e-b465-91837ab82d2c
00000000-0000-0000-0000-000000000000	63	aIHVEIaBUjRaAYKymstK9g	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-07 20:04:43.690953+00	2025-04-07 21:02:51.068791+00	jZZpOHVRnqi0ypumiBRi7g	e356093c-d48d-4593-ad76-c0f8f198215e
00000000-0000-0000-0000-000000000000	69	lgfNBAD9KJj2jIRZV2TZ7g	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-07 21:02:51.070377+00	2025-04-07 21:02:51.070377+00	aIHVEIaBUjRaAYKymstK9g	e356093c-d48d-4593-ad76-c0f8f198215e
00000000-0000-0000-0000-000000000000	64	SXLxPcoSH81CtzvRlwSZNw	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	t	2025-04-07 20:07:58.082098+00	2025-04-07 21:09:08.952609+00	QDhkKQQFgdMYIsVz7iiq9Q	d7992f80-8d49-452e-b502-35b830be963a
00000000-0000-0000-0000-000000000000	65	7zhDKnqeML8lkNhkqYvNeg	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-07 20:46:47.175896+00	2025-04-07 21:45:30.437591+00	zUkuejFgY0Q9dgCjf_VWaQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	54	b5TFQMzrX4TXpXqH9EAkBg	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-04 23:29:28.553243+00	2025-04-07 21:49:40.053685+00	Ga5yDQ9-Uisrwq-o76QCmg	4fca3c70-db1b-4df9-b886-2128414bfff2
00000000-0000-0000-0000-000000000000	70	N_sjk6sLNVH4RNbbgwGLKg	17be3a68-8d97-4557-85e8-8e8cc9ecbc13	f	2025-04-07 21:09:08.955339+00	2025-04-07 21:09:08.955339+00	SXLxPcoSH81CtzvRlwSZNw	d7992f80-8d49-452e-b502-35b830be963a
00000000-0000-0000-0000-000000000000	71	RrFKwYr14lpZvNeaqO12gw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-07 21:40:35.131604+00	2025-04-07 21:40:35.131604+00	\N	48c8598d-bb2a-43f1-9d25-36462d3e8c76
00000000-0000-0000-0000-000000000000	326	IXyu5CaIHC9bwzPRh7jqaQ	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	f	2025-04-25 04:59:56.939668+00	2025-04-25 04:59:56.939668+00	96Y33DZ6ln_YMm4eVQyc3Q	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	86	PZKA8CMZKUXLs4V6yj2xrA	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-07 23:35:55.724559+00	2025-04-08 21:25:25.402959+00	\N	bd306676-f60a-4666-a038-5c80d3c4efe7
00000000-0000-0000-0000-000000000000	98	s2uZNcWy4h9ytevN0P1K_Q	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-08 07:30:34.691282+00	2025-04-08 21:29:32.352267+00	UmvlMdeYnW7czRAGaqw85w	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	75	QgM89_8W2zePN_9MPR9uMg	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-07 21:49:40.057753+00	2025-04-07 21:49:40.057753+00	b5TFQMzrX4TXpXqH9EAkBg	4fca3c70-db1b-4df9-b886-2128414bfff2
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
00000000-0000-0000-0000-000000000000	327	LAaIB4OCuWd6rKf-EKJMZg	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-25 05:12:08.701217+00	2025-04-25 05:12:08.701217+00	Ax9wIo094745-47nZT8-5A	382cbb2f-cb8a-483d-bd3b-f43f50756870
00000000-0000-0000-0000-000000000000	120	Pi5smE5StSnrAL4g9LcccQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 07:38:19.590067+00	2025-04-09 09:23:16.09854+00	G_KU0dkzWRRBpr63iGHLmw	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	328	bMRim0I6xGf8cg29Y14geg	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-25 05:12:11.293791+00	2025-04-25 05:12:11.293791+00	\N	d7a619b3-b98c-4d7e-9b83-cfbac0790254
00000000-0000-0000-0000-000000000000	121	coZCWAxsF53NhleeBS9XUQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 09:23:16.102308+00	2025-04-09 17:49:52.212415+00	Pi5smE5StSnrAL4g9LcccQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	329	t6zaFDAssBYDqKlVnv9ACw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-25 05:12:12.068767+00	2025-04-25 05:12:12.068767+00	\N	d89a2f1a-2a1a-42b6-9f78-e9b6ddaaa2ee
00000000-0000-0000-0000-000000000000	123	nJhOX3m1PY6kGLeOXJzkGQ	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-10 01:20:04.193146+00	2025-04-10 01:20:04.193146+00	_aVLmjWUt4HW-yl1xQXAhw	97af4dbc-bc49-480b-a851-142d4eaaf6df
00000000-0000-0000-0000-000000000000	122	llWCURoIASaRHm3vP_whzw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-09 17:49:52.221462+00	2025-04-10 02:12:14.915338+00	coZCWAxsF53NhleeBS9XUQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	125	NUUauIzi3ZiOMYMDlpB0BA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 02:12:14.920456+00	2025-04-10 03:11:38.146871+00	llWCURoIASaRHm3vP_whzw	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	126	0u1k_asIIAHkSlWjHDVPbQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 03:11:38.153186+00	2025-04-10 04:09:41.338084+00	NUUauIzi3ZiOMYMDlpB0BA	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	129	SB1G4Fyj3E2K81EM5fcVsg	44339363-8791-433b-93d4-93642c90c69a	f	2025-04-10 04:17:48.476206+00	2025-04-10 04:17:48.476206+00	ZoOi4jETrqty8HAqbwwCOw	5bfb37df-b486-4f5f-a0a6-4a33f371866a
00000000-0000-0000-0000-000000000000	127	o4bwnTmV94etK5ytCRj3Lg	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 03:25:19.055244+00	2025-04-10 04:23:56.494281+00	-yo-yw5pvdXuL52oD11Uow	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	128	hBmq-rixMl2rLqjP_yx85A	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 04:09:41.341659+00	2025-04-10 05:20:40.377984+00	0u1k_asIIAHkSlWjHDVPbQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	131	ybLr3tYrv-vlHYHv85k_oQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 04:23:56.498149+00	2025-04-10 05:24:45.735455+00	o4bwnTmV94etK5ytCRj3Lg	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	134	Wa6_MoBJQHGf1dEIFLPRxQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 05:24:45.73609+00	2025-04-10 06:23:19.908127+00	ybLr3tYrv-vlHYHv85k_oQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	133	A7gqYt3EoiYuP1QPlcJwyA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 05:20:40.378375+00	2025-04-10 06:29:28.909254+00	hBmq-rixMl2rLqjP_yx85A	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	137	4RCPxtjmYV13NFJA67w3-w	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 06:29:28.911228+00	2025-04-10 07:29:14.50608+00	A7gqYt3EoiYuP1QPlcJwyA	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	138	J0aYBK2OjKqA2PycM416jQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 07:29:14.511149+00	2025-04-10 08:27:17.968298+00	4RCPxtjmYV13NFJA67w3-w	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	140	_UEZ5Ib1E06ZtsQdJSO7Mg	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 08:27:17.972834+00	2025-04-10 09:25:36.901949+00	J0aYBK2OjKqA2PycM416jQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	136	9E6tFbnttREb04aSqtx4xw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 06:23:19.910449+00	2025-04-10 17:41:28.311428+00	Wa6_MoBJQHGf1dEIFLPRxQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	145	9kyeW-0s1SZuRomro6ZulQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 17:41:28.318052+00	2025-04-10 19:10:23.300447+00	9E6tFbnttREb04aSqtx4xw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	148	2usjxIDVKLayXsfnGCeJCA	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	f	2025-04-10 19:30:06.804784+00	2025-04-10 19:30:06.804784+00	\N	2c7ce081-da33-4144-aa5a-1b51a7b68d8f
00000000-0000-0000-0000-000000000000	142	a2StN3vOekZi8k6LU81_qQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 09:25:36.907593+00	2025-04-10 19:32:53.029018+00	_UEZ5Ib1E06ZtsQdJSO7Mg	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	107	zCsi7v0x4XyZcBPcWPrKaQ	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-08 22:32:41.416408+00	2025-04-10 19:39:44.925048+00	kHDRG1FylVlTSX8_85rgmw	bd306676-f60a-4666-a038-5c80d3c4efe7
00000000-0000-0000-0000-000000000000	151	X7YK3cGyB6lResC-JZNp-Q	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 19:39:44.925714+00	2025-04-10 19:39:44.925714+00	zCsi7v0x4XyZcBPcWPrKaQ	bd306676-f60a-4666-a038-5c80d3c4efe7
00000000-0000-0000-0000-000000000000	152	P7jmlkbKPh0XJfKTJto17g	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 19:39:48.668738+00	2025-04-10 19:39:48.668738+00	\N	4fe18208-4e51-4082-8856-293cc6493bb0
00000000-0000-0000-0000-000000000000	153	QxAOx3-jH6u5EnFBHqcL2A	53080ade-33ee-4342-ae5e-9683f4368b6a	f	2025-04-10 19:43:55.540853+00	2025-04-10 19:43:55.540853+00	\N	e747ee9b-2fab-4953-bab9-f8ea6b6c8e05
00000000-0000-0000-0000-000000000000	154	0HOhzmDH3v4-ABlZ5p0K9w	0475f20b-25ce-485e-95cc-bd729859637d	f	2025-04-10 19:44:53.878791+00	2025-04-10 19:44:53.878791+00	\N	090ea1cc-ac4d-405f-9a26-c1112daf2318
00000000-0000-0000-0000-000000000000	124	_-R_jpB2wlog59xo67nxRw	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-10 01:20:04.578363+00	2025-04-10 19:45:03.358538+00	\N	fff2c5c9-c6c6-44e3-8fec-a0b85fab5581
00000000-0000-0000-0000-000000000000	155	lnDLrPyUxFE_Oz2g8XOj7w	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-10 19:45:03.359111+00	2025-04-10 19:45:03.359111+00	_-R_jpB2wlog59xo67nxRw	fff2c5c9-c6c6-44e3-8fec-a0b85fab5581
00000000-0000-0000-0000-000000000000	157	iqmyvfR8P-W2s7uUzkFbgw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 19:54:09.017888+00	2025-04-10 19:54:09.017888+00	\N	574dcacd-7698-41ca-8630-1203261e9df3
00000000-0000-0000-0000-000000000000	158	eWPzPO3pz05smHgI7PUj7Q	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 19:54:09.206067+00	2025-04-10 19:54:09.206067+00	\N	5aa6ea21-37bf-4d10-b5f5-067f24ca2657
00000000-0000-0000-0000-000000000000	146	UJZ3MvTKuUw-tn1XjLxMSg	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 19:10:23.30706+00	2025-04-10 20:11:27.820641+00	9kyeW-0s1SZuRomro6ZulQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	149	N6h8AXHpRRK4QAunh3Y2fw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 19:32:53.033214+00	2025-04-10 20:31:34.433389+00	a2StN3vOekZi8k6LU81_qQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	159	H3RmHlQuRkZr40CypavTmA	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-10 19:54:10.938493+00	2025-04-10 21:09:59.519328+00	\N	422907f0-37fb-4c98-9f77-58011487397d
00000000-0000-0000-0000-000000000000	160	Zg8o0_64xFASX5Hd5r_dkw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 20:11:27.823275+00	2025-04-10 21:20:44.594757+00	UJZ3MvTKuUw-tn1XjLxMSg	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	163	rklkYZlycybbJL1mX22NLg	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 20:31:34.438056+00	2025-04-10 21:48:42.104081+00	N6h8AXHpRRK4QAunh3Y2fw	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	156	4C1sUC8UV-_i2z_aVh-Otw	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-10 19:45:03.964389+00	2025-04-22 22:01:35.84508+00	\N	4c9d2a2f-2119-4f63-ae49-24cb1d31ceff
00000000-0000-0000-0000-000000000000	168	NO7Y7lcCk0O6Md7qB2-isw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 21:09:59.52519+00	2025-04-10 21:09:59.52519+00	H3RmHlQuRkZr40CypavTmA	422907f0-37fb-4c98-9f77-58011487397d
00000000-0000-0000-0000-000000000000	169	EnCN-Ork31NCCsCxuG43qQ	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 21:18:46.091135+00	2025-04-10 21:18:46.091135+00	\N	ed890fa7-a63a-44e5-9ac1-4af27b980869
00000000-0000-0000-0000-000000000000	173	HCmHsvTMLPikVx3dGkBa0A	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-10 21:36:53.26906+00	2025-04-10 21:36:53.26906+00	\N	9e771491-91bd-45c4-8f58-923d75a54e9d
00000000-0000-0000-0000-000000000000	170	d4fsq-r9tIzxcRaw3W1WAQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 21:20:44.600398+00	2025-04-10 22:21:31.484229+00	Zg8o0_64xFASX5Hd5r_dkw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	175	PwHhB3H9UZ7un0hHKVioxw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 21:48:42.110534+00	2025-04-10 22:51:54.062759+00	rklkYZlycybbJL1mX22NLg	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	183	vzVpzhtG_CbUoIwzHq8BpQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-10 22:21:31.484828+00	2025-04-11 00:02:50.659732+00	d4fsq-r9tIzxcRaw3W1WAQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	185	Z1Yi2fpkmHWM7kDIEBZCNQ	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	t	2025-04-10 23:00:47.566478+00	2025-04-11 00:22:29.705957+00	\N	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	174	drOr128wqsoehrmegXF0fQ	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-10 21:36:54.387454+00	2025-04-11 00:49:58.755957+00	\N	6f11687f-212a-424e-914a-bb82c1ef01f9
00000000-0000-0000-0000-000000000000	184	hJjp3MQoh0FtAwBX9FJaXA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-10 22:51:54.069447+00	2025-04-11 04:17:53.928718+00	PwHhB3H9UZ7un0hHKVioxw	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	189	xwJBU3wTExfRriXkCdVQCw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-11 04:17:53.938136+00	2025-04-11 05:15:53.59379+00	hJjp3MQoh0FtAwBX9FJaXA	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	190	v9yBPwED1VbbKyHc7MTsDQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-11 05:15:53.600664+00	2025-04-11 06:14:21.210309+00	xwJBU3wTExfRriXkCdVQCw	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	187	CZBSkDpwTK0mRlv0qOlt6Q	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	t	2025-04-11 00:22:29.708803+00	2025-04-11 06:40:31.489856+00	Z1Yi2fpkmHWM7kDIEBZCNQ	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	192	7KN68H8gqAuyT-DKPdkFLA	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	t	2025-04-11 06:40:31.497067+00	2025-04-11 19:06:10.613019+00	CZBSkDpwTK0mRlv0qOlt6Q	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	186	nBL0Kn07f2YZupg4iuTtAg	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-11 00:02:50.661441+00	2025-04-11 19:51:39.000973+00	vzVpzhtG_CbUoIwzHq8BpQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	193	xzMdVnOnLbeiPDe83pWFlQ	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	t	2025-04-11 19:06:10.631841+00	2025-04-11 20:10:19.67957+00	7KN68H8gqAuyT-DKPdkFLA	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	197	p_5W_zJJaBL2IyiPxoR9hg	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	t	2025-04-11 20:10:19.684754+00	2025-04-11 21:20:28.457339+00	xzMdVnOnLbeiPDe83pWFlQ	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	199	nk8Ob7_qLBHoCzdo5zho4w	b5d11271-9904-408a-b5ee-ae67ebda0586	t	2025-04-11 20:43:47.426232+00	2025-04-11 21:42:04.553235+00	\N	8dc2563d-ef58-4675-8d67-e40cc2b826c8
00000000-0000-0000-0000-000000000000	201	U-iHhpC8uAGLektyYMhZhg	b5d11271-9904-408a-b5ee-ae67ebda0586	f	2025-04-11 21:42:04.558247+00	2025-04-11 21:42:04.558247+00	nk8Ob7_qLBHoCzdo5zho4w	8dc2563d-ef58-4675-8d67-e40cc2b826c8
00000000-0000-0000-0000-000000000000	202	91hmtFloYgAEJvW2utTHsg	b5d11271-9904-408a-b5ee-ae67ebda0586	f	2025-04-11 21:46:42.55689+00	2025-04-11 21:46:42.55689+00	\N	27c14cde-9f2d-443b-a6f4-03cf943f0b02
00000000-0000-0000-0000-000000000000	194	uTyZnptl8DaEwpNmD44G_A	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-11 19:51:39.006979+00	2025-04-11 21:57:49.374598+00	nBL0Kn07f2YZupg4iuTtAg	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	200	DGGYe6R8aztwy0DEg7b_Pw	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	t	2025-04-11 21:20:28.461537+00	2025-04-11 22:20:02.168547+00	p_5W_zJJaBL2IyiPxoR9hg	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	204	XzBUNrZDbrZz9cGNdziEbw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-11 21:57:49.379057+00	2025-04-11 22:55:59.57927+00	uTyZnptl8DaEwpNmD44G_A	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	206	ZVZQsjPYVAcIvwWgieXMMg	b5d11271-9904-408a-b5ee-ae67ebda0586	t	2025-04-11 22:07:31.741883+00	2025-04-11 23:05:56.148096+00	\N	40b93ad2-ecd2-4d4e-952e-a0ee6c871a56
00000000-0000-0000-0000-000000000000	209	sQOwrg5fZgSxMQWAvn0dVA	b5d11271-9904-408a-b5ee-ae67ebda0586	f	2025-04-11 23:05:56.152079+00	2025-04-11 23:05:56.152079+00	ZVZQsjPYVAcIvwWgieXMMg	40b93ad2-ecd2-4d4e-952e-a0ee6c871a56
00000000-0000-0000-0000-000000000000	191	6HcrPhCc_8wRVvCMn56T-g	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-11 06:14:21.216159+00	2025-04-11 23:20:05.37738+00	v9yBPwED1VbbKyHc7MTsDQ	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	207	Q1WmUOPeKYOcX-mFMJG3LA	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	t	2025-04-11 22:20:02.172134+00	2025-04-11 23:20:13.867257+00	DGGYe6R8aztwy0DEg7b_Pw	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	208	xd36ECsHfw9tqb8dD9XGFw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-11 22:55:59.58866+00	2025-04-11 23:56:48.975478+00	XzBUNrZDbrZz9cGNdziEbw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	210	NkVtaBUmikrUXvCHEU3E7g	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-11 23:20:05.381182+00	2025-04-12 02:29:48.966236+00	6HcrPhCc_8wRVvCMn56T-g	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	211	VFId3KaKlz_1j19n2QUvSw	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	t	2025-04-11 23:20:13.867663+00	2025-04-12 22:12:49.25426+00	Q1WmUOPeKYOcX-mFMJG3LA	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	188	6lYdwIT-UrCzBAboTmIbhA	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-11 00:49:58.760421+00	2025-04-13 04:56:47.843661+00	drOr128wqsoehrmegXF0fQ	6f11687f-212a-424e-914a-bb82c1ef01f9
00000000-0000-0000-0000-000000000000	239	10covanKCauOdVMyk6qLMQ	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-22 21:42:54.263862+00	2025-04-22 22:41:35.735608+00	ty7_UBQwfi9zd4zZZt4Qhg	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	215	plkh2eeUAucSLLglYKEH5g	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-12 02:29:48.97151+00	2025-04-12 03:28:15.282967+00	NkVtaBUmikrUXvCHEU3E7g	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	240	ZHwBuLD3te9p044NPt3uCw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-22 21:48:45.662489+00	2025-04-22 22:46:47.145093+00	2Zpri5GdT0-auWK9JQResw	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	218	TEaif_wv-zbgg_Zot6kZGg	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-13 04:56:47.858034+00	2025-04-13 04:56:47.858034+00	6lYdwIT-UrCzBAboTmIbhA	6f11687f-212a-424e-914a-bb82c1ef01f9
00000000-0000-0000-0000-000000000000	219	RPhzzB-s7YE-DxORHZJcnA	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-13 04:57:51.54996+00	2025-04-13 04:57:51.54996+00	\N	0ca08ded-37fc-44a9-86fa-72a4f24781ac
00000000-0000-0000-0000-000000000000	220	7XWGN2t9oroBi6LnGW4bzQ	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-13 04:57:53.337159+00	2025-04-13 06:57:52.074665+00	\N	0c22576f-da17-4493-9773-7a725bb34108
00000000-0000-0000-0000-000000000000	242	JW6gnbcTcs9etnac5aNO5w	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-22 21:57:01.115645+00	2025-04-22 23:13:16.855167+00	\N	37d900bb-a5fa-4045-bd48-d5ab94643b17
00000000-0000-0000-0000-000000000000	221	7z8F9VhjpbyOP8E9OXyAPw	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-13 06:57:52.091566+00	2025-04-13 07:55:52.690639+00	7XWGN2t9oroBi6LnGW4bzQ	0c22576f-da17-4493-9773-7a725bb34108
00000000-0000-0000-0000-000000000000	222	wLIrLbnGnn3HaJ16AUwcbA	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-13 07:55:52.694196+00	2025-04-13 20:11:39.153359+00	7z8F9VhjpbyOP8E9OXyAPw	0c22576f-da17-4493-9773-7a725bb34108
00000000-0000-0000-0000-000000000000	252	etovaE73SN49l-6g8HTKpA	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-22 23:09:11.307282+00	2025-04-23 04:50:16.166936+00	\N	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	223	MNA5L76Eq-FQIGDo63azUg	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-13 20:11:39.176441+00	2025-04-13 21:09:42.61853+00	wLIrLbnGnn3HaJ16AUwcbA	0c22576f-da17-4493-9773-7a725bb34108
00000000-0000-0000-0000-000000000000	224	AD7ERvWuL7_p24ywlWPYgw	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-13 21:09:42.622936+00	2025-04-16 06:25:27.150349+00	MNA5L76Eq-FQIGDo63azUg	0c22576f-da17-4493-9773-7a725bb34108
00000000-0000-0000-0000-000000000000	225	bK7yJ60CD7FGQmLMyGazyg	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-16 06:25:27.163807+00	2025-04-16 06:25:27.163807+00	AD7ERvWuL7_p24ywlWPYgw	0c22576f-da17-4493-9773-7a725bb34108
00000000-0000-0000-0000-000000000000	251	hFaE0kLQdcoxCvEnDSGyBg	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-22 23:07:34.368917+00	2025-04-23 18:08:46.905239+00	\N	7730bf04-fa95-4347-8dc9-eac5957f9420
00000000-0000-0000-0000-000000000000	226	LpbxcGf_FA-i4stP8uKGqg	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-16 06:25:46.32562+00	2025-04-16 22:27:24.138378+00	\N	95a3e82c-2f37-4601-bbd1-f0abb464d619
00000000-0000-0000-0000-000000000000	214	G0YKdNep1DP6B-iQhMBXnw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-11 23:56:48.978296+00	2025-04-21 19:34:36.50772+00	xd36ECsHfw9tqb8dD9XGFw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	216	UMjlwCXAII3OvH-qEcb67Q	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-12 03:28:15.288452+00	2025-04-22 04:02:04.188014+00	plkh2eeUAucSLLglYKEH5g	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	230	SIidUUdz0gD9tHpAJGq26A	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-22 04:02:04.198111+00	2025-04-22 04:02:04.198111+00	UMjlwCXAII3OvH-qEcb67Q	130e0fb5-ad02-4b04-a09f-718a2beb5096
00000000-0000-0000-0000-000000000000	258	GK4G0HwDnkCdkJ6JRBqi4w	7ff2a62c-ef30-4c1e-8465-57ada3bb6897	f	2025-04-23 18:12:12.22368+00	2025-04-23 18:12:12.22368+00	\N	1f9d16ca-22c7-4574-8dda-73e54e7d7cd2
00000000-0000-0000-0000-000000000000	227	ib8sNMyTSFSHCWSGlHDu0Q	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-16 22:27:24.144922+00	2025-04-22 21:41:05.758201+00	LpbxcGf_FA-i4stP8uKGqg	95a3e82c-2f37-4601-bbd1-f0abb464d619
00000000-0000-0000-0000-000000000000	236	nn9TQn81ABPiUsY38nwCDA	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-22 21:41:05.762973+00	2025-04-22 21:41:05.762973+00	ib8sNMyTSFSHCWSGlHDu0Q	95a3e82c-2f37-4601-bbd1-f0abb464d619
00000000-0000-0000-0000-000000000000	237	nkqf8cY0OlbZo1H__u9n8w	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-22 21:41:07.910684+00	2025-04-22 21:41:07.910684+00	\N	b4e0f780-29f4-442c-ab6d-50c9e8dd3c61
00000000-0000-0000-0000-000000000000	238	OcGv2-F3V4qgGsf_6kAZaw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-22 21:41:09.296618+00	2025-04-22 21:41:09.296618+00	\N	ff2ffc29-8f7b-4be5-8fa1-8bee545e0cc8
00000000-0000-0000-0000-000000000000	229	ty7_UBQwfi9zd4zZZt4Qhg	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-21 19:34:36.521422+00	2025-04-22 21:42:54.2628+00	G0YKdNep1DP6B-iQhMBXnw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	231	2Zpri5GdT0-auWK9JQResw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-22 04:02:08.9206+00	2025-04-22 21:48:45.655662+00	\N	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	241	SXXmUj3UHm1Ybm0UNE4Rzw	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-22 21:56:59.694985+00	2025-04-22 21:56:59.694985+00	\N	c6fe2736-fba9-4734-bffb-2b66909d6225
00000000-0000-0000-0000-000000000000	243	Hhcgntto34BukOsBbyBeeA	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-22 22:01:35.850758+00	2025-04-22 22:01:35.850758+00	4C1sUC8UV-_i2z_aVh-Otw	4c9d2a2f-2119-4f63-ae49-24cb1d31ceff
00000000-0000-0000-0000-000000000000	217	PEVw2qJ02TQ-uYqkW1UNmw	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	t	2025-04-12 22:12:49.268403+00	2025-04-22 22:23:23.434941+00	VFId3KaKlz_1j19n2QUvSw	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	245	8EDTRxZt9egKhFrJo-YdEQ	d2f63e49-f24d-4cda-8ff8-9056d6ee4bea	f	2025-04-22 22:23:23.439561+00	2025-04-22 22:23:23.439561+00	PEVw2qJ02TQ-uYqkW1UNmw	874209f2-651b-434a-b39d-862f816d4220
00000000-0000-0000-0000-000000000000	248	7zUoSH1KxQCbwHjTVlvlyQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-22 22:46:47.146414+00	2025-04-23 18:43:38.450667+00	ZHwBuLD3te9p044NPt3uCw	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	260	iYowE4WUSVuJVDbJvh-oHQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-23 18:43:38.459534+00	2025-04-23 19:42:16.633823+00	7zUoSH1KxQCbwHjTVlvlyQ	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	254	vuJ9DermWMjWkjyAllDNqQ	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-23 04:50:16.171891+00	2025-04-24 02:44:55.844653+00	etovaE73SN49l-6g8HTKpA	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	262	Na8NrTJATdGVs36z78jTHA	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 02:44:55.853832+00	2025-04-24 03:47:32.761606+00	vuJ9DermWMjWkjyAllDNqQ	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	263	nX6GTSOfgoTuBJXVYkx0zg	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 03:47:32.767422+00	2025-04-24 05:21:26.616017+00	Na8NrTJATdGVs36z78jTHA	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	261	iTiZ10357RdZIpIAUe10qA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-23 19:42:16.641345+00	2025-04-24 05:34:29.353907+00	iYowE4WUSVuJVDbJvh-oHQ	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	264	9AFTsO4bWcrdaGwu-SvrUg	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 05:21:26.620582+00	2025-04-24 06:22:45.23473+00	nX6GTSOfgoTuBJXVYkx0zg	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	244	lMMQQCqRE-581_HZqbNOrQ	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-22 22:01:37.740188+00	2025-04-24 19:23:55.819137+00	\N	95d5610c-95ee-4627-91e7-98b3fc2b9926
00000000-0000-0000-0000-000000000000	255	_ttIYjvfmXkbaxsF6g_-2A	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-23 18:08:46.92439+00	2025-04-24 19:25:06.642525+00	hFaE0kLQdcoxCvEnDSGyBg	7730bf04-fa95-4347-8dc9-eac5957f9420
00000000-0000-0000-0000-000000000000	253	9svDikdkKKeUtL4IBmGx8w	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-22 23:13:16.858623+00	2025-04-24 19:57:12.645143+00	JW6gnbcTcs9etnac5aNO5w	37d900bb-a5fa-4045-bd48-d5ab94643b17
00000000-0000-0000-0000-000000000000	309	Ax9wIo094745-47nZT8-5A	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-24 23:57:22.378144+00	2025-04-25 05:12:08.697218+00	u23Tolmnxv-sEU98QFMEVA	382cbb2f-cb8a-483d-bd3b-f43f50756870
00000000-0000-0000-0000-000000000000	266	4LyGvGE4f3Eoix_vN6Y4kw	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 06:22:45.239085+00	2025-04-24 07:24:01.491503+00	9AFTsO4bWcrdaGwu-SvrUg	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	265	zpTWho37clYztt7pp69tlQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 05:34:29.35999+00	2025-04-24 08:27:07.268389+00	iTiZ10357RdZIpIAUe10qA	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	268	qqBdazYmE0m14Ebrnw7_VQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 08:27:07.277925+00	2025-04-24 09:25:07.345358+00	zpTWho37clYztt7pp69tlQ	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	269	Fhmti74iRxJEYbKP9RjgrA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 09:25:07.351924+00	2025-04-24 10:38:14.743746+00	qqBdazYmE0m14Ebrnw7_VQ	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	270	zbQhtPAhTljgVBk3HBPK3Q	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 10:38:14.750918+00	2025-04-24 11:36:20.819175+00	Fhmti74iRxJEYbKP9RjgrA	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	267	gvjMTZ5eunusCWXuYspq-A	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 07:24:01.503163+00	2025-04-24 17:52:32.992308+00	4LyGvGE4f3Eoix_vN6Y4kw	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	272	TObdAeWgYkQBjfh1N8K0VA	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 17:52:33.009217+00	2025-04-24 19:06:56.571312+00	gvjMTZ5eunusCWXuYspq-A	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	247	YWzLI1v_MbfN5SAhz2J3Ag	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-22 22:41:35.738076+00	2025-04-24 19:09:21.638828+00	10covanKCauOdVMyk6qLMQ	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	276	xBNTrNXa8G5bs-7f3qbxGQ	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	f	2025-04-24 19:25:06.644462+00	2025-04-24 19:25:06.644462+00	_ttIYjvfmXkbaxsF6g_-2A	7730bf04-fa95-4347-8dc9-eac5957f9420
00000000-0000-0000-0000-000000000000	271	1K8Y8ljg2UmYyhhMNI_MvA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 11:36:20.82608+00	2025-04-24 19:25:42.586383+00	zbQhtPAhTljgVBk3HBPK3Q	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	279	TH4ms1lS1uFgOTxrsQ8ANQ	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	f	2025-04-24 19:37:24.551357+00	2025-04-24 19:37:24.551357+00	\N	1aaeccca-2b00-44cb-a6c4-b3c77552cb80
00000000-0000-0000-0000-000000000000	280	HkcbMoeRz6kXGdAcyLHxCg	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	f	2025-04-24 19:40:02.636946+00	2025-04-24 19:40:02.636946+00	\N	6579dc73-8909-4098-ac46-b96e6b4081c8
00000000-0000-0000-0000-000000000000	281	uji9n-VMFUHNiMYmwezLeQ	7dfad126-2905-431a-829b-fcae851fe102	f	2025-04-24 19:57:12.652304+00	2025-04-24 19:57:12.652304+00	9svDikdkKKeUtL4IBmGx8w	37d900bb-a5fa-4045-bd48-d5ab94643b17
00000000-0000-0000-0000-000000000000	277	ljspRaqgB6kPBK5PnUUuMA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 19:25:42.587355+00	2025-04-24 20:24:28.954208+00	1K8Y8ljg2UmYyhhMNI_MvA	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	274	0SFc-49uevaQ50JcS6BiXw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-24 19:09:21.639499+00	2025-04-24 20:35:32.444815+00	YWzLI1v_MbfN5SAhz2J3Ag	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	273	frlBchxpgI13fKIuBKgkCA	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 19:06:56.578704+00	2025-04-24 20:55:28.376367+00	TObdAeWgYkQBjfh1N8K0VA	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	282	9h9qfLSpY5_PHP4QylWUYg	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-24 19:57:17.486206+00	2025-04-24 20:55:56.226638+00	\N	382cbb2f-cb8a-483d-bd3b-f43f50756870
00000000-0000-0000-0000-000000000000	285	ZwO03Cf5cPPxzXpPdhvRMQ	ef15530b-dd57-4e43-a6ab-a04aa7b3a979	t	2025-04-24 20:08:51.685354+00	2025-04-24 21:14:28.039353+00	\N	abd391d5-a2f8-412a-8db9-3b196102f97d
00000000-0000-0000-0000-000000000000	286	53uI36YjcveWkziiZEszJg	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 20:24:28.959362+00	2025-04-24 21:26:27.709179+00	ljspRaqgB6kPBK5PnUUuMA	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	289	mIneyjxIWID4s8ZtlPzw8w	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-24 20:35:32.44799+00	2025-04-24 21:39:13.921218+00	0SFc-49uevaQ50JcS6BiXw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	291	QgiG_rU6xUffI9EY7dHdQw	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-24 20:55:56.22958+00	2025-04-24 21:54:02.910824+00	9h9qfLSpY5_PHP4QylWUYg	382cbb2f-cb8a-483d-bd3b-f43f50756870
00000000-0000-0000-0000-000000000000	290	aj1nwuOLlYLaJz6C0Q3vwQ	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 20:55:28.380138+00	2025-04-24 21:59:55.645132+00	frlBchxpgI13fKIuBKgkCA	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	287	6CGbH8rWtKiordYjV0MuYA	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 20:25:30.075207+00	2025-04-24 22:00:10.669104+00	\N	9551b715-9dae-498b-b6cc-e5b31d13fb0c
00000000-0000-0000-0000-000000000000	298	GBSiz3xStzP4SMyhoWgJgw	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	f	2025-04-24 22:00:10.669551+00	2025-04-24 22:00:10.669551+00	6CGbH8rWtKiordYjV0MuYA	9551b715-9dae-498b-b6cc-e5b31d13fb0c
00000000-0000-0000-0000-000000000000	293	Dc9a9SsBjkUSOffzt864YA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 21:26:27.71373+00	2025-04-24 22:25:57.950032+00	53uI36YjcveWkziiZEszJg	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	295	m29Hu3YX68pSlJRxdkhtmw	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-24 21:39:13.926219+00	2025-04-24 22:38:29.690522+00	mIneyjxIWID4s8ZtlPzw8w	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	292	2cCHyUn3WoI7miUbOwKDDg	ef15530b-dd57-4e43-a6ab-a04aa7b3a979	t	2025-04-24 21:14:28.045555+00	2025-04-24 22:43:09.197336+00	ZwO03Cf5cPPxzXpPdhvRMQ	abd391d5-a2f8-412a-8db9-3b196102f97d
00000000-0000-0000-0000-000000000000	275	T1c3ohGHkkxDAWYb8ewm9w	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-24 19:23:55.825529+00	2025-04-24 22:52:25.87447+00	lMMQQCqRE-581_HZqbNOrQ	95d5610c-95ee-4627-91e7-98b3fc2b9926
00000000-0000-0000-0000-000000000000	304	MGhHe5OwbOplFbQ-mGEvKA	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-24 22:52:25.881045+00	2025-04-24 22:52:25.881045+00	T1c3ohGHkkxDAWYb8ewm9w	95d5610c-95ee-4627-91e7-98b3fc2b9926
00000000-0000-0000-0000-000000000000	296	8Vp9F77E542fm6X2UKzWzQ	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-24 21:54:02.916761+00	2025-04-24 22:59:07.315934+00	QgiG_rU6xUffI9EY7dHdQw	382cbb2f-cb8a-483d-bd3b-f43f50756870
00000000-0000-0000-0000-000000000000	301	gsOVDfhYuEYFA_KRY6W2rg	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 22:25:57.959239+00	2025-04-24 23:24:34.137016+00	Dc9a9SsBjkUSOffzt864YA	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	306	u23Tolmnxv-sEU98QFMEVA	7dfad126-2905-431a-829b-fcae851fe102	t	2025-04-24 22:59:07.318903+00	2025-04-24 23:57:22.375911+00	8Vp9F77E542fm6X2UKzWzQ	382cbb2f-cb8a-483d-bd3b-f43f50756870
00000000-0000-0000-0000-000000000000	305	GAowRCDTmZycaxNwVnRotA	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-24 22:52:26.664162+00	2025-04-25 00:05:37.137797+00	\N	5ad7c46a-838c-41d1-b4e8-ca77a4587e49
00000000-0000-0000-0000-000000000000	302	HLDw51YsJCWVMSvdoRWS7Q	564b41de-e4a1-4e56-bff7-c0681abc0718	t	2025-04-24 22:38:29.696676+00	2025-04-25 00:24:17.627185+00	m29Hu3YX68pSlJRxdkhtmw	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	308	sWj_xcfaDN5Ji0n72atTCg	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-24 23:24:34.137341+00	2025-04-25 00:24:44.164401+00	gsOVDfhYuEYFA_KRY6W2rg	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	299	MU8xACafr8W9QJU9XxJE4w	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 22:00:20.499904+00	2025-04-25 03:30:26.412633+00	\N	0499a9ef-1783-4f29-b7fa-3e277836e66e
00000000-0000-0000-0000-000000000000	297	LqLbGArKI7El-twRgakSSQ	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-24 21:59:55.650329+00	2025-04-25 03:30:32.008814+00	aj1nwuOLlYLaJz6C0Q3vwQ	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	303	8AZOIPznxTrp7SHDGvNW1w	ef15530b-dd57-4e43-a6ab-a04aa7b3a979	t	2025-04-24 22:43:09.203315+00	2025-04-25 04:44:24.42813+00	2cCHyUn3WoI7miUbOwKDDg	abd391d5-a2f8-412a-8db9-3b196102f97d
00000000-0000-0000-0000-000000000000	318	96Y33DZ6ln_YMm4eVQyc3Q	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	t	2025-04-25 03:30:32.009604+00	2025-04-25 04:59:56.930192+00	LqLbGArKI7El-twRgakSSQ	610b311e-6abc-4269-98a9-60e35c694331
00000000-0000-0000-0000-000000000000	312	SrPW3MBH4nckzCUowWl6Lg	564b41de-e4a1-4e56-bff7-c0681abc0718	f	2025-04-25 00:24:17.628631+00	2025-04-25 00:24:17.628631+00	HLDw51YsJCWVMSvdoRWS7Q	c6efa894-a00f-4d8f-8e9f-d5d13662571a
00000000-0000-0000-0000-000000000000	313	hxnq9XWTzJ04V-jjYuVAcQ	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-25 00:24:44.16475+00	2025-04-25 02:34:45.451813+00	sWj_xcfaDN5Ji0n72atTCg	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	310	OkGAtgOuFalgU8T7P1NlQQ	9950b2e9-632f-42ff-b259-726ede4e408f	t	2025-04-25 00:05:37.142294+00	2025-04-25 03:08:37.26136+00	GAowRCDTmZycaxNwVnRotA	5ad7c46a-838c-41d1-b4e8-ca77a4587e49
00000000-0000-0000-0000-000000000000	315	gvniuhacG88xeGRXpaGyXw	9950b2e9-632f-42ff-b259-726ede4e408f	f	2025-04-25 03:08:37.266863+00	2025-04-25 03:08:37.266863+00	OkGAtgOuFalgU8T7P1NlQQ	5ad7c46a-838c-41d1-b4e8-ca77a4587e49
00000000-0000-0000-0000-000000000000	317	OQUZQXLae2b0VCg8MCctdQ	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	f	2025-04-25 03:30:26.416581+00	2025-04-25 03:30:26.416581+00	MU8xACafr8W9QJU9XxJE4w	0499a9ef-1783-4f29-b7fa-3e277836e66e
00000000-0000-0000-0000-000000000000	314	Z1N-MHTvcCfFP1x5XlC8zw	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-25 02:34:45.462667+00	2025-04-25 03:32:51.802395+00	hxnq9XWTzJ04V-jjYuVAcQ	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	321	l1Dc8JwnyfxXfGCLnu7DAA	ef15530b-dd57-4e43-a6ab-a04aa7b3a979	f	2025-04-25 04:44:24.433466+00	2025-04-25 04:44:24.433466+00	8AZOIPznxTrp7SHDGvNW1w	abd391d5-a2f8-412a-8db9-3b196102f97d
00000000-0000-0000-0000-000000000000	322	XLKruT3qwecjlET2lnl-sg	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-25 04:44:37.038665+00	2025-04-25 04:44:37.038665+00	\N	e0b7bd0f-80ae-41f8-85e0-c44a337b0502
00000000-0000-0000-0000-000000000000	319	5SyXCmQuwPA65BiakTnODA	ff98b050-236d-4a28-8aea-567f03b9f3c3	t	2025-04-25 03:32:51.80426+00	2025-04-25 04:46:47.898099+00	Z1N-MHTvcCfFP1x5XlC8zw	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	323	Ydd_vdrRbbadZZ9BtbjR0A	ff98b050-236d-4a28-8aea-567f03b9f3c3	f	2025-04-25 04:46:47.903949+00	2025-04-25 04:46:47.903949+00	5SyXCmQuwPA65BiakTnODA	02fab783-8b00-4b26-9459-698e26d243fd
00000000-0000-0000-0000-000000000000	324	88muz-OYXiEc98GnJQVd1Q	7478c90f-4de7-494d-ae79-fc28756dc4ab	f	2025-04-25 04:47:31.989971+00	2025-04-25 04:47:31.989971+00	\N	9ae1d074-b493-4c14-934d-87ee06b7db31
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

COPY "public"."Empleado" ("ID_Empleado", "Nombre", "Rol", "ID_Departamento", "Nivel", "Cargabilidad", "ID_CapabilityLead", "FechaContratacion", "FechaUltNivel", "ID_PeopleLead", "Biografia") FROM stdin;
7478c90f-4de7-494d-ae79-fc28756dc4ab	rick	skjxn	\N	12	\N	\N	\N	\N	\N	\N
5314bfcf-8401-457f-b7a7-2221ea64777c	Betanzo	dhxbs	\N	12	\N	\N	\N	\N	\N	\N
9950b2e9-632f-42ff-b259-726ede4e408f	Emir 	El mejor de todos 	\N	10	\N	\N	\N	\N	\N	\N
dee4835c-764c-40fb-bf0b-3bff8a0457d4	Pancho Naranjas	maestro de s teorico	\N	12	\N	\N	\N	\N	\N	\N
9d6ddaee-5f7c-4cef-8705-6db6a8d11109	yi	jsasnxkj	\N	akjsxnaks	0%	\N	\N	\N	\N	\N
c3886a9b-c360-4fec-b16d-058747789ee2	aksc	jnXKj	\N	12	0%	\N	2025-04-04	2025-04-04	\N	\N
a57aab4d-0c82-479b-91cd-2502a0c7dac8	Sergio  r	ajklsbxjhc	2665a062-12cf-4d0a-9e4b-f3805418a6a8	12	0%	\N	2025-04-07	2025-04-07	\N	\N
7dfad126-2905-431a-829b-fcae851fe102	David	Dev	4a349d40-f10f-46f7-9465-259a1669f2b2	10	0%	\N	2025-04-07	2025-04-07	\N	\N
6eb32f88-231e-4237-9f93-6689a94b624d	sd	asda	2665a062-12cf-4d0a-9e4b-f3805418a6a8	12	0%	\N	2025-04-07	2025-04-07	\N	\N
2eadd525-41bd-4c5d-9073-faf9c6b91714	Auch	devops	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-07	2025-04-07	\N	\N
31fbe58a-c798-401a-b2aa-c06726293956	test	jaisn	4a349d40-f10f-46f7-9465-259a1669f2b2	11	0%	\N	2025-04-07	2025-04-07	\N	\N
0e41703f-9367-446f-ab66-0c5477edda65	ajsn	an	a337fc73-b929-4ce7-b71b-5c3c0ad45e06	11	0%	\N	2025-04-07	2025-04-07	\N	\N
a004e928-2b22-4749-ad53-9232297705be	kns	qwe	46e63a6e-e0b1-4d27-b213-94005e83de75	12	0%	\N	2025-04-07	2025-04-07	\N	\N
204b4114-7454-40dd-afd4-d4521f0c2558	a3	ajs	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-07	2025-04-07	\N	\N
392c88d5-a2c3-4a14-88d1-2d84bc8133c5	sjd	js	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-07	2025-04-07	\N	\N
17be3a68-8d97-4557-85e8-8e8cc9ecbc13	david Lozano	dev	\N	1	\N	\N	\N	\N	\N	\N
37a795b1-0a19-41ca-a09c-805dc258ac38	jbhds	asjknx	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-07	2025-04-07	\N	\N
a0a40b5c-c8be-40f1-ae42-d8bb32677c8e	1	as	31560a35-62a5-4020-9eb4-c211aee51a66	12	0%	\N	2025-04-07	2025-04-07	\N	\N
0a38c26c-3a86-42cb-b39b-c9c76848f0e5	oij	bhj	dd6c79f7-80fd-48b3-97f6-119551d3d2c3	yug	0%	\N	2025-04-07	2025-04-07	\N	\N
9cdc8f90-0c14-4d94-bfba-45c371b30735	zy2	yep	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-08	2025-04-08	\N	\N
44339363-8791-433b-93d4-93642c90c69a	Test03	aslkm	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-08	2025-04-08	\N	\N
66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	Delivery	Delivery	4a349d40-f10f-46f7-9465-259a1669f2b2	7	0%	\N	2025-04-10	2025-04-10	\N	\N
412b6cda-4dbd-4bec-832e-1509eaf56414	Capability	Capability	4a349d40-f10f-46f7-9465-259a1669f2b2	8	0%	\N	2025-04-10	2025-04-10	\N	\N
53080ade-33ee-4342-ae5e-9683f4368b6a	people lead	people lead	4a349d40-f10f-46f7-9465-259a1669f2b2	9	0%	\N	2025-04-10	2025-04-10	\N	\N
0475f20b-25ce-485e-95cc-bd729859637d	Talent lead	Talent	dd6c79f7-80fd-48b3-97f6-119551d3d2c3	7	0%	\N	2025-04-10	2025-04-10	\N	\N
b5d11271-9904-408a-b5ee-ae67ebda0586	Empleado	Empleado	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-11	2025-04-11	\N	\N
7ff2a62c-ef30-4c1e-8465-57ada3bb6897	Lizeth	BA	2665a062-12cf-4d0a-9e4b-f3805418a6a8	10	0%	\N	2025-04-23	2025-04-23	\N	\N
06e8e948-5dd3-4b5f-b314-25fa5cd5893b	Isaac Sanchez	Dev	4a349d40-f10f-46f7-9465-259a1669f2b2	3	0%	3660958c-1eaa-4b94-aef2-88570ab6613d	2025-04-22	2025-04-22	16af9aa7-11b8-4ad2-abdc-70d02096b65c	\N
ef15530b-dd57-4e43-a6ab-a04aa7b3a979	caso1	caso	4a349d40-f10f-46f7-9465-259a1669f2b2	12	0%	\N	2025-04-24	2025-04-24	\N	\N
b3f42013-85ab-406b-b823-89ab1da60b82	John Doe	Developer	4a349d40-f10f-46f7-9465-259a1669f2b2	Senior	80%	750242c6-e9f3-4c20-bb49-f39fc02fcc51	\N	\N	a02d6134-314f-4c1e-a1e2-9594df42bf01	A hardworker with interests in hardworking because I hardwork
ff98b050-236d-4a28-8aea-567f03b9f3c3	Ramón Antonio Naranjo Sarmiento	s master 2	\N	12	\N	\N	\N	\N	\N	dada
9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	Jane Smith	HR Manager	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Manager	100%	3660958c-1eaa-4b94-aef2-88570ab6613d	\N	\N	d87e4b98-e814-4409-9d30-1d93333b46ca	dada
\.


--
-- Data for Name: Capability_Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Capability_Lead" ("ID_CapabilityLead", "ID_Departamento", "Rol", "ID_Empleado") FROM stdin;
750242c6-e9f3-4c20-bb49-f39fc02fcc51	4a349d40-f10f-46f7-9465-259a1669f2b2	Capability Manager	b3f42013-85ab-406b-b823-89ab1da60b82
3660958c-1eaa-4b94-aef2-88570ab6613d	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Capability Lead	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
812d93a7-b853-4e0c-859a-af79fd2a4690	\N	\N	9950b2e9-632f-42ff-b259-726ede4e408f
ebe0368c-47c5-40a1-bcd7-323a0efe2bfa	\N	\N	a004e928-2b22-4749-ad53-9232297705be
e2778248-1a76-4401-8f83-2e754c610bbd	\N	\N	dee4835c-764c-40fb-bf0b-3bff8a0457d4
89532d8d-4108-4d74-af70-d869d91576e3	\N	\N	412b6cda-4dbd-4bec-832e-1509eaf56414
9d9675c1-c5d6-42cd-95a1-1932d3f27060	\N	\N	7478c90f-4de7-494d-ae79-fc28756dc4ab
\.


--
-- Data for Name: Certificados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Certificados" ("ID_Certificado", "Nombre", "Fecha_caducidad", "Documento", "ID_Empleado", "Verificacion", "Descripcion") FROM stdin;
ca2ef2ef-4ba2-4191-8e1d-08597cae339e	Black Belt Scrom Master	2025-04-08	scrom.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	t	rayjdratarat
f23aa09a-8d3f-445f-b9b7-597feadf214e	Javascript Certificate	2025-04-08	document.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	f	Certificacion faslificada. DESPEDIDO
22237bb3-7e0a-475d-81e5-dc1de8aabfae	prueba3	2025-04-11	https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/documentos/9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/29148-2011.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	\N	
4af72e6f-925e-45bb-954b-325e6cc1deb2	a david	2025-04-23	https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/documentos/9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/Data-Backup-Plan-Template_.docx-1.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	\N	
9bead295-7b86-45b0-9135-add24b65c565	Certificado	2025-04-23	https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/documentos/9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/Module%20Handbook%20Certificates%2025-26_final_02_2025%20(1).pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	\N	
b8f8e7f8-dd18-4f96-98b9-648b12302e6c	amogus	2025-04-10	https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/documentos/9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/Pathexplorer.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	t	hola
42ad8ef3-1182-430e-a570-3dfd2315d9cc	certificado3	2025-04-24	https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/documentos/9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/M4%20Luffy.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	\N	
37a3fe75-c67b-4abb-80a4-5debaa503393	prueba2	2025-04-11	https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/documentos/9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/828-2012.pdf	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	t	
\.


--
-- Data for Name: Contacto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Contacto" ("PK_Contacto", "Email", "Num_Telefono", "ID_empleado", "Estado", "Pais") FROM stdin;
a1dd3af4-1807-4d20-bdef-6bb13d67eab1	jane.smith@example.com	1234567890	\N	\N	\N
28159de2-34b4-4e26-82ea-2426a36a4061	zic@tec.mx	\N	\N	\N	\N
9cdc8f90-0c14-4d94-bfba-45c371b30736	zy2@gmail.com	\N	\N	\N	\N
45611567-d68c-47ea-b5c7-7b84f54ded49	test03@g.com	\N	44339363-8791-433b-93d4-93642c90c69a	\N	\N
f5b106ff-c378-41b3-a757-a34a715c45b5	Delivery@g.com	\N	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a	\N	\N
e7eb3eeb-d7f8-49b4-91bb-bdb5ab37ad06	Capability@g.com	\N	412b6cda-4dbd-4bec-832e-1509eaf56414	\N	\N
e8012509-8630-4cb1-890c-5db9b21d9e08	peoplelead@g.com	\N	53080ade-33ee-4342-ae5e-9683f4368b6a	\N	\N
b358ffd9-563f-4320-b4c9-346cd9853248	Talent@g.com	\N	0475f20b-25ce-485e-95cc-bd729859637d	\N	\N
531cd8bf-ccd4-47c0-b547-8b020663e73e	Empleado@g.com	\N	b5d11271-9904-408a-b5ee-ae67ebda0586	\N	\N
a83ade82-b71d-45da-b3ac-ccc1d99e537f	a01198327@tec.mx	\N	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	\N	\N
7f379987-d035-439d-8825-04f4cf3e1d39	Liz@g.com	\N	7ff2a62c-ef30-4c1e-8465-57ada3bb6897	\N	\N
71cb220c-5fc8-485e-b043-9500b2f21485	caso@g.com	\N	ef15530b-dd57-4e43-a6ab-a04aa7b3a979	\N	\N
28d6a104-d3dd-4967-88f5-bde0c7f9057c	john.doe@example.com	229 437 9573	b3f42013-85ab-406b-b823-89ab1da60b82	Tlaxcala	México
8d2e181b-dfac-4195-ae9c-4ebbdad1f769	\N	\N	\N	da	ad
a18cf2b6-d30d-4de1-b340-ccab73ef5c2e	\N	\N	\N	da	dada
ab5345ea-7ab9-48dd-8652-02d5d2e8a5e4	\N	\N	\N	dada	dada
94e4b5e6-d1e2-47d9-9dc2-9b27d1f774bb	\N	\N	\N	da	da
25785d2c-6e03-4bb4-b04a-093e3565ae0c	\N	\N	\N	da	ad
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

COPY "public"."Cursos" ("ID_Curso", "Nombre", "Fecha_fin_curso", "link", "Descripcion") FROM stdin;
5f5bbec7-f37a-4d7a-83a3-3e2b6780e700	React Development	2025-05-15	https://www.freecodecamp.org/news/learn-javascript-free-js-courses-for-beginners/#heading-learn-javascript-full-course-for-beginners	\N
b855f167-1544-4b59-b7df-0b6cc9e771c0	Leadership Training	2025-03-01	https://www.scrum.org/courses/professional-agile-leadership-essentials-training	\N
5a32164b-128d-411b-8eb8-efe635d6d65a	Curso de prueba	\N		Descripcion de prueba
9b037cda-1239-4d87-9bb4-e4710dfd3476	test	\N		test
fddf242f-4fac-49a0-becd-79a7ae2f6d9f	test	\N		test
40e3f6d8-6d13-4f91-9c8e-a47b3ac53be9	curso de prueba #2	\N		pruebas
22ca0ce0-30d5-4be2-b246-20fed0bb5664	Curso de prueba #3	\N	https://github.com/RICTEL04/pathexplorer-esquimales/tree/emir-carreando	Pruebas
ee2df4a2-2275-47a6-8429-479e76b98d9f	Curso de prueba #4	\N	https://github.com/RICTEL04/pathexplorer-esquimales/tree/emir-carreando	test
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
3bc7ec9b-d669-461f-a27c-8b18d8e6537e	hard	Python
b3a3eb50-8d42-40f8-b8d5-ad04251d6b81	soft	prueba
\.


--
-- Data for Name: Cursos_Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Cursos_Habilidades" ("created_at", "ID_Curso", "ID_Habilidad") FROM stdin;
2025-04-25 00:53:44.278108+00	fddf242f-4fac-49a0-becd-79a7ae2f6d9f	6cf4dbcf-058b-4a42-b48a-6e33272bde60
2025-04-25 03:08:58.105833+00	40e3f6d8-6d13-4f91-9c8e-a47b3ac53be9	6cf4dbcf-058b-4a42-b48a-6e33272bde60
2025-04-25 03:08:58.105833+00	40e3f6d8-6d13-4f91-9c8e-a47b3ac53be9	5d3bad23-c29d-4f5c-9911-aeb084227398
2025-04-25 03:11:33.482719+00	22ca0ce0-30d5-4be2-b246-20fed0bb5664	a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb
2025-04-25 03:12:23.529213+00	ee2df4a2-2275-47a6-8429-479e76b98d9f	6cf4dbcf-058b-4a42-b48a-6e33272bde60
\.


--
-- Data for Name: Delivery_Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Delivery_Lead" ("ID_DeliveryLead", "Nombre", "Rol", "ID_Empleado") FROM stdin;
536e085a-fb2e-4c56-892d-35625a943941	Alice Johnson	Delivery Manager	\N
c30266b2-324d-442c-8702-b99ece958f29	Bob Brown	Delivery Lead	\N
04dde96b-200b-4a8a-86a3-b3498478a248	\N	\N	9950b2e9-632f-42ff-b259-726ede4e408f
83f73d8c-88f1-4ef3-bec1-86da540a3442	\N	\N	44339363-8791-433b-93d4-93642c90c69a
84266509-ec88-43d5-82c5-f3ed1c8386b0	\N	\N	a004e928-2b22-4749-ad53-9232297705be
7a14817b-7047-4e8b-bb84-433beb63d0e2	\N	\N	dee4835c-764c-40fb-bf0b-3bff8a0457d4
e5595827-0691-4f9d-a583-02b04e8f0e61	\N	\N	66297fcd-b66d-4deb-ad5b-f24ba1dfd26a
f0485dab-545b-4a53-9eb8-934fd1fac994	\N	\N	7478c90f-4de7-494d-ae79-fc28756dc4ab
7d0111b4-fc92-4482-bb83-2e613e1c99e4	\N	\N	ef15530b-dd57-4e43-a6ab-a04aa7b3a979
2143cf93-d8ec-48fb-9804-eea879a0b1fe	\N	\N	412b6cda-4dbd-4bec-832e-1509eaf56414
\.


--
-- Data for Name: Direccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Direccion" ("PK_Direccion", "Calle", "Estado", "Pais", "Ciudad", "Num_Casa", "ID_Cliente", "ID_Empleado") FROM stdin;
c419244a-cbaf-48d8-986d-7addd00b14c5	456 Elm St	New York	USA	New York City	202	225a0afe-646d-491e-b4aa-238a0772bcc2	\N
a8643749-9adb-41b6-9150-4bedd160034c	\N	\N	\N	\N	xd	3e301b16-bda6-4a2b-ba5c-b9f2393c9b14	b3f42013-85ab-406b-b823-89ab1da60b82
\.


--
-- Data for Name: Empleado_Habilidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Empleado_Habilidades" ("ID_Empleado", "ID_Habilidad", "Estado") FROM stdin;
b3f42013-85ab-406b-b823-89ab1da60b82	6cf4dbcf-058b-4a42-b48a-6e33272bde60	\N
9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2	a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb	\N
ff98b050-236d-4a28-8aea-567f03b9f3c3	6cf4dbcf-058b-4a42-b48a-6e33272bde60	\N
ff98b050-236d-4a28-8aea-567f03b9f3c3	a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb	\N
ff98b050-236d-4a28-8aea-567f03b9f3c3	25a67b3f-87c6-43d0-92ca-93885a6e09e0	\N
ff98b050-236d-4a28-8aea-567f03b9f3c3	5d3bad23-c29d-4f5c-9911-aeb084227398	\N
b3f42013-85ab-406b-b823-89ab1da60b82	a77b0b4c-05a4-4aed-b9df-6bab4a6d7bbb	\N
b3f42013-85ab-406b-b823-89ab1da60b82	36a5b1cc-971b-49a1-945c-790da3403e70	\N
7dfad126-2905-431a-829b-fcae851fe102	5d3bad23-c29d-4f5c-9911-aeb084227398	\N
b3f42013-85ab-406b-b823-89ab1da60b82	5d3bad23-c29d-4f5c-9911-aeb084227398	\N
b3f42013-85ab-406b-b823-89ab1da60b82	25a67b3f-87c6-43d0-92ca-93885a6e09e0	\N
\.


--
-- Data for Name: People_lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."People_lead" ("ID", "ID_Empleado") FROM stdin;
a02d6134-314f-4c1e-a1e2-9594df42bf01	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2
d87e4b98-e814-4409-9d30-1d93333b46ca	b3f42013-85ab-406b-b823-89ab1da60b82
a0d82ef6-60ce-4057-b0df-81b9e7aecbcc	44339363-8791-433b-93d4-93642c90c69a
9a5a94b8-99d4-4457-b7b7-a27e143429b0	a004e928-2b22-4749-ad53-9232297705be
16af9aa7-11b8-4ad2-abdc-70d02096b65c	53080ade-33ee-4342-ae5e-9683f4368b6a
d2c27fa1-a2b4-487d-93b5-5a8e567f3cb6	7ff2a62c-ef30-4c1e-8465-57ada3bb6897
fad31fe8-f1d7-4819-b36d-1bde32b4654e	ef15530b-dd57-4e43-a6ab-a04aa7b3a979
279c6b82-4419-45da-9bf6-89bdf66e21c8	412b6cda-4dbd-4bec-832e-1509eaf56414
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
51db80cf-2aa3-4aef-865c-8cdc1caaeb10	nada	7dfad126-2905-431a-829b-fcae851fe102
a80fcc62-76d1-4f4e-9cd0-6bc512ffcebe	lolold	ff98b050-236d-4a28-8aea-567f03b9f3c3
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

COPY "public"."Proyectos" ("ID_Proyecto", "Nombre", "ID_Cliente", "Descripcion", "Status", "ID_DeliveryLead", "fecha_inicio", "fecha_fin") FROM stdin;
dd8b61fa-b013-46b1-ac31-9b13bd142bec	Website Panaderia	\N	Sitio web para una panaderia	\N	\N	2025-04-24	2025-04-30
d74b87b9-e2f1-4630-9111-d7bc8eeda82a	App parque local	\N	app movil para un parque local	\N	\N	2025-04-30	2025-05-07
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
67e638e2-ff5b-47ad-b05a-24ac06c5af96	2025-04-24 20:54:27.280973+00	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	d74b87b9-e2f1-4630-9111-d7bc8eeda82a	Developer
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
fb8d3db5-bf72-4a79-8b1e-f3691fc6d8c8	4a349d40-f10f-46f7-9465-259a1669f2b2	Talent Manager	\N
ad890a10-57a0-45ef-a809-b01cd55ba971	2665a062-12cf-4d0a-9e4b-f3805418a6a8	Talent Lead	\N
a33c6e9f-17ca-4fc9-8ecf-b3b5aaa92545	\N	\N	a004e928-2b22-4749-ad53-9232297705be
666d4813-849f-4f09-ad74-a5511f41d607	\N	\N	0475f20b-25ce-485e-95cc-bd729859637d
b0addda4-56b0-4859-ab03-fb641fa76f35	\N	\N	ef15530b-dd57-4e43-a6ab-a04aa7b3a979
2e809eb0-f56c-46fe-8e4a-7d2f7d355ede	\N	\N	412b6cda-4dbd-4bec-832e-1509eaf56414
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
787b268b-9805-4080-a958-a9bd6f0363c5	documentos	06e8e948-5dd3-4b5f-b314-25fa5cd5893b/Pathexplorer.pdf	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	2025-04-24 05:22:22.855726+00	2025-04-24 05:22:22.855726+00	2025-04-24 05:22:22.855726+00	{"eTag": "\\"33fe4788feab92ac37048e015d2dc97b\\"", "size": 3418655, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-24T05:22:23.000Z", "contentLength": 3418655, "httpStatusCode": 200}	22d3fe30-e4dd-421a-95fc-31b8e1ec4207	06e8e948-5dd3-4b5f-b314-25fa5cd5893b	{}
2252ef02-8752-4b71-b018-217af1e780fa	documentos	9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2/M4 Luffy.pdf	7478c90f-4de7-494d-ae79-fc28756dc4ab	2025-04-10 23:08:25.649527+00	2025-04-24 20:18:03.933874+00	2025-04-10 23:08:25.649527+00	{"eTag": "\\"4d5e67c65953b2e674f9ae94879246be\\"", "size": 32834, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-04-24T20:18:04.000Z", "contentLength": 32834, "httpStatusCode": 200}	5ba5279c-f5fe-46af-9dff-2ca0a0d076b1	7478c90f-4de7-494d-ae79-fc28756dc4ab	{}
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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 329, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
