'use client'

import { MailIcon, NewspaperIcon } from 'lucide-react'
import { type FormEvent, useEffect, useState } from 'react'

import { TextFallButton } from '@/components/gsap/text-fall-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type ISubscribeResponse, subscribe } from '@/lib/docs'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isValidEmail = (email: string) => emailRegex.test(email)

export const Newsletter = () => {
  const [result, setResult] = useState<ISubscribeResponse | undefined>(undefined)
  const [email, setEmail] = useState('')

  useEffect(() => {
    setResult(undefined)
  }, [email])

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    if (email.length === 0 || !isValidEmail(email)) {
      setResult({
        success: false,
        message: 'Please enter a valid email'
      })
      return
    }
    const res = await subscribe({ email: email })
    setResult(res)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex flex-col items-center overflow-hidden rounded bg-foreground/5 px-3 py-4 text-center sm:px-8 sm:py-6 xl:px-16"
    >
      <NewspaperIcon className="-z-1 -rotate-45 absolute top-4 left-4 size-12 text-foreground/10" />
      <p className="font-medium text-lg/none">Join our newsletter!</p>
      <div className="mt-3 flex items-center gap-2 sm:mt-4 sm:gap-3">
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          name="email"
          className="w-52 bg-background shadow-none sm:w-72"
          placeholder="mail@site.com"
        />
        <Button type="submit" className="sm:hidden" size="icon">
          <MailIcon />
        </Button>
        <TextFallButton
          type="submit"
          className="cursor-pointer rounded-md bg-primary py-2 ps-3.5 pe-3.75 font-medium text-primary-foreground text-sm max-sm:hidden"
        >
          Subscribe
        </TextFallButton>
      </div>
      {result && !result.success && (
        <span className="text-destructive text-xs sm:text-sm">{result.message}</span>
      )}
      {result?.success && (
        <span className="text-green-500 text-xs sm:text-sm">{result.message}</span>
      )}
      <p className="mt-2 text-muted-foreground text-xs">
        We only send important updates. never spam!
      </p>
    </form>
  )
}
