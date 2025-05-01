import useSWR from 'swr'

async function fetchAPI(key) {
  const response = await fetch(key)
  const responseBody = await response.json()
  return responseBody
}

export default function StatusPage() {
  const response = useSWR('/api/v1/status', fetchAPI, {
    refreshInterval: 2000,
  })
  return (
    <>
      <h1>Status Page</h1>
      <UpdatedAt updatedAt={response.data?.updated_at} />
      <DatabaseStatus />
    </>
  )
}

function UpdatedAt() {
  const { isLoading, data } = useSWR('/api/v1/status', fetchAPI, {
    refreshInterval: 2000,
  })
  let updatedAtText = 'Carregando...'
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })
  }
  return <div>Última atualização {updatedAtText} </div>
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR('/api/v1/status', fetchAPI, {
    refreshInterval: 2000,
  })
  let databaseStatusInformation = 'Carregando...'
  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões Abertas: {data.dependencies.database.opened_connections}
        </div>
        <div>
          Conexões Máximas: {data.dependencies.database.max_connections}
        </div>
      </>
    )
    return (
      <>
        <h2>Banco de Dados</h2>
        <div>{databaseStatusInformation}</div>
      </>
    )
  }
}
