const core = require('@actions/core');
const {SchemaRegistry, SchemaType} = require('@kafkajs/confluent-schema-registry');
const { fs } = require('fs')

(async () => {
    try {
        const SCHEMA_REGISTRY_URL = core.getInput('SCHEMA_REGISTRY_URL')
        const KAFKA_USERNAME = core.getInput('KAFKA_USERNAME')
        const KAFKA_PASSWORD = core.getInput('KAFKA_PASSWORD')
        const TOPIC = core.getInput('TOPIC')
        const VALUE_SCHEMA_PATH = core.getInput('VALUE_SCHEMA_PATH')
        const KEY_SCHEMA_PATH = core.getInput('KEY_SCHEMA_PATH')

        const valueSchema = await fs.readFile(VALUE_SCHEMA_PATH, 'utf-8')
        const keySchema = await fs.readFile(KEY_SCHEMA_PATH, 'utf-8')

        const registry = new SchemaRegistry({
            host: SCHEMA_REGISTRY_URL, auth: {
                username: KAFKA_USERNAME,
                password: KAFKA_PASSWORD
            }
        })

        const { valueSchemaId } = await registry.register({
            type: SchemaType.AVRO,
            schema: valueSchema
        }, {subject: `${TOPIC}-value`})
        const { keySchemaId } = await registry.register({
            type: SchemaType.AVRO,
            schema: keySchema
        }, {subject: `${TOPIC}-key`})

        core.setOutput('VALUE_SCHEMA_ID', valueSchemaId)
        core.setOutput('KEY_SCHEMA_ID', keySchemaId)
    } catch (e) {
        core.setFailed(e.message)
    }
})()