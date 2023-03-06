import { useMediaQuery } from 'react-responsive'

const useQuery = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return {
    isMobile,
  }
}

export default useQuery
