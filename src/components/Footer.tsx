const AUTHOR_NAME = 'Javid Mougamadou'
const PERSONAL_URL = 'https://javid-mougamadou.pro/'
const SPACES_NAME = 'Javid Spaces'
const SPACES_URL = 'https://javid-space.cloud/'
const DAISYUI_URL = 'https://daisyui.com/'

export function Footer() {
  return (
    <footer className="flex w-full max-w-lg flex-col items-center justify-center gap-2 py-6 text-center text-sm text-base-content/80">
      <p>
        Created by{' '}
        <a
          href={PERSONAL_URL}
          target="_blank"
          rel="author noreferrer"
          aria-label={`${AUTHOR_NAME} - Creator`}
          className="link link-primary font-semibold underline-offset-2 hover:underline"
        >
          {AUTHOR_NAME}
        </a>{' '}
        on{' '}
        <a
          href={SPACES_URL}
          target="_blank"
          rel="noreferrer"
          className="link link-primary font-semibold underline-offset-2 hover:underline"
        >
          {SPACES_NAME}
        </a>
      </p>
      <p>
        UI components by{' '}
        <a
          href={DAISYUI_URL}
          target="_blank"
          rel="noreferrer"
          className="link link-primary font-semibold underline-offset-2 hover:underline"
        >
          DaisyUI
        </a>
      </p>
    </footer>
  )
}
