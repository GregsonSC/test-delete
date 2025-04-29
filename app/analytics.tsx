import { headers } from 'next/headers'
import Script from 'next/script'

export default function Analytics() {
  // const countryCode = headers().get('x-vercel-ip-country') || 'US'

  return (
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-5ESTPV5GRK" />
  )
}