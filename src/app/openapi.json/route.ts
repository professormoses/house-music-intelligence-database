import { SITE } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: `${SITE.name} API`,
      version: '1.0.0',
      description: `${SITE.tagline} Published by ${SITE.publisher}. All responses are public, CORS-enabled, and citation-ready.`,
    },
    servers: [{ url: SITE.url }],
    paths: {
      '/api/artists': {
        get: {
          summary: 'List & filter artists',
          parameters: [
            { name: 'q', in: 'query', schema: { type: 'string' }, description: 'Free-text search' },
            { name: 'genre', in: 'query', schema: { type: 'string' } },
            { name: 'country', in: 'query', schema: { type: 'string' } },
            { name: 'city', in: 'query', schema: { type: 'string' } },
            { name: 'scene', in: 'query', schema: { type: 'string' } },
            { name: 'minListeners', in: 'query', schema: { type: 'integer' } },
            { name: 'hasContact', in: 'query', schema: { type: 'boolean' } },
            { name: 'blackLineage', in: 'query', schema: { type: 'boolean' } },
            { name: 'emerging', in: 'query', schema: { type: 'boolean' } },
            { name: 'sort', in: 'query', schema: { type: 'string', enum: ['priority', 'reach', 'name', 'recent'] } },
            { name: 'page', in: 'query', schema: { type: 'integer' } },
            { name: 'pageSize', in: 'query', schema: { type: 'integer' } },
          ],
          responses: { '200': { description: 'Paged list of artist summaries' } },
        },
      },
      '/api/artists/{slug}.json': {
        get: {
          summary: 'Full artist profile',
          parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Artist profile', content: { 'application/json': { schema: { $ref: '#/components/schemas/Artist' } } } }, '404': { description: 'Not found' } },
        },
      },
      '/artist/{slug}.md': {
        get: { summary: 'Artist profile as Markdown (for LLMs)', parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Markdown' } } },
      },
      '/api/labels/{slug}.json': {
        get: { summary: 'Full label record', parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Label' } } },
      },
      '/api/changed-since': {
        get: { summary: 'Records changed since a date', parameters: [{ name: 'date', in: 'query', required: true, schema: { type: 'string', format: 'date' } }], responses: { '200': { description: 'Change list' } } },
      },
    },
    components: {
      schemas: {
        Artist: {
          type: 'object',
          properties: {
            slug: { type: 'string' },
            artist_name: { type: 'string' },
            genres: { type: 'array', items: { type: 'string' } },
            origin_country: { type: 'string' },
            confidence_score: { type: 'integer' },
            last_verified_date: { type: 'string', format: 'date' },
            suggested_citation: { type: 'string' },
            field_sources: { type: 'object', additionalProperties: { $ref: '#/components/schemas/FieldSource' } },
            scores: { type: 'object' },
          },
        },
        FieldSource: {
          type: 'object',
          properties: {
            value: {},
            source_name: { type: 'string' },
            source_url: { type: 'string', format: 'uri' },
            last_verified_date: { type: 'string', format: 'date' },
            confidence_score: { type: 'integer' },
          },
        },
      },
    },
  };
  return Response.json(spec, { headers: { 'access-control-allow-origin': '*' } });
}
