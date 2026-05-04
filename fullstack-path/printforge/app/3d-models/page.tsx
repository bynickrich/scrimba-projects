import ModelsGrid from '@/app/components/ModelsGrid'
import type { Model, ModelsPageProps } from '@/app/types'
import { getModels } from '@/app/lib/models'
import Form from 'next/form'

function normalizeQueryParam(value: string | string[] | undefined): string[] {
  const values = value === undefined ? [] : Array.isArray(value) ? value : [value]

  return values.map((value) => value.trim().toLowerCase()).filter(Boolean)
}

function filterModelsByQuery(models: Model[], queries: string[]): Model[] {
  if (queries.length === 0) return models

  return models.filter((model) => {
    const searchableText = `${model.name} ${model.description}`.toLowerCase()

    return queries.some((query) => searchableText.includes(query))
  })
}

export default async function Page({ searchParams }: ModelsPageProps) {
  const { query } = await searchParams
  const models = await getModels()
  const queries = normalizeQueryParam(query)
  const filteredModels = filterModelsByQuery(models, queries)

  return (
    <>
      <Form action="/3d-models">
        <input type="text" name="query" placeholder="Search" />
      </Form>
      <ModelsGrid title="3D Models" models={filteredModels} />
    </>
  )
}
