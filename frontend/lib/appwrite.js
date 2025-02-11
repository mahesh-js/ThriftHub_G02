import { Client, Account } from "appwrite";
import authConfig from "../config/auth.json";

const client = new Client()
  .setEndpoint(authConfig.endpoint)
  .setProject(authConfig.projectId);

export const account = new Account(client);