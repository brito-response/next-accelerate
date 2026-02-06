#!/usr/bin/env node
import { createResource } from "./commands/create-resource";

const inputName = process.argv[2];
createResource(inputName);