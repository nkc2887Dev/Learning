import { useQuery } from '@tanstack/react-query';

function DataFetcher() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchData'],
    queryFn: async () => {
      const response = await fetch('https://api.freeapi.app/api/v1/public/randomjokes?limit=10&query=science&inc=categories%252Cid%252Ccontent&page=1');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='card'>
      <h3>useQuery</h3>
      {data.data.data.map((item)=>(
        <pre key={item.id}>{item.id}</pre>
      ))}
    </div>
  );
}

export default DataFetcher;
