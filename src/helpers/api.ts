import { paths } from "@/api/schema";
import createClient from "openapi-fetch";

export const url =
    "https://sherpa-telegram-api-service.delightfulground-7cb093f7.southeastasia.azurecontainerapps.io";

// export const url = "http://127.0.0.1:8000";

export const client = createClient<paths>({
    baseUrl: url,
});
