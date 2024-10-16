export const metadata = {
  title: "인력 요청 시스템 구축"
}

import './styles/reset.css';
import './styles/common.css';
import Providers from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
