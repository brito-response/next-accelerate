#!/usr/bin/env node
import { createResource } from "./commands/create-resource.js";

const inputName = process.argv[2];
createResource(inputName);
