import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TouchpadOff } from 'lucide-react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Sidebar } from '@/components/sidebar'

const queryClient = new QueryClient()

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <div className="h-screen bg-zinc-900">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15} maxSize={40}>
          <Sidebar />
        </Panel>

        <PanelResizeHandle className="w-px bg-zinc-700 hover:bg-zinc-600 transition-colors duration-150" />

        <Panel defaultSize={80} minSize={60}>
          <Outlet />
        </Panel>
      </PanelGroup>
    </div>
  </QueryClientProvider>
)

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
          <TouchpadOff className="size-28 text-zinc-400" />
          <h3 className="text-lg font-semibold text-zinc-200">
            404 - Page Not Found
          </h3>
          <p className="text-sm text-zinc-400 max-w-md">
            The page you are looking for does not exist
          </p>
        </div>
      </div>
    )
  },
})
