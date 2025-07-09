import { useState } from 'react'

export default function Home() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleBuscar = async () => {
    if (!startDate || !endDate) {
      setError('Preencha as duas datas antes de buscar.')
      return
    }
    if (startDate > endDate) {
      setError('A data de início deve ser anterior à data fim.')
      return
    }

    setError(null)
    setLoading(true)
    setData(null)

    const sd = startDate.replace(/-/g, '')
    const ed = endDate.replace(/-/g, '')
    const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/?start_date=${sd}&end_date=${ed}`

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setData(await res.json())
    } catch (err) {
      setError(`Erro ao buscar: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="cotacao">
      <h1>Buscar Cotação USD/BRL</h1>

      <div className="form-controls">
        <label className="form-label">
          Data Início
          <input
            className="form-input"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>

        <label className="form-label">
          Data Fim
          <input
            className="form-input"
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>

        <button className="btn" onClick={handleBuscar}>
          Buscar
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Carregando...</p>}

      {data && Array.isArray(data) && (
        <>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Compra</th>
                <th>Venda</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.timestamp}>
                  <td>{new Date(item.timestamp * 1000).toLocaleDateString('pt-BR')}</td>
                  <td>R$ {parseFloat(item.bid).toFixed(4)}</td>
                  <td>R$ {parseFloat(item.ask).toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <small className="updated">
            Última atualização: {new Date(Number(data[0].timestamp) * 1000).toLocaleString('pt-BR')}
          </small>
        </>
      )}
    </main>
  )
}
