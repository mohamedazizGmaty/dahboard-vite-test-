export function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-slate-950 dark:border-slate-800 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 StrollUP. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <a href="#" className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

