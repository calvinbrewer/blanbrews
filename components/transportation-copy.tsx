import { taxiHref, taxiNumber } from '@/lib/wedding'

export function TransportationCopy() {
  return (
    <>
      Guests are responsible for getting themselves to all wedding events, and
      home from the brunch. A complimentary return shuttle will be provided
      after evening events. To book a local taxi, call{' '}
      <a href={taxiHref} className="underline text-blue-400 whitespace-nowrap">
        {taxiNumber}
      </a>
      . We recommend calling ahead, as service runs on &quot;Italian time.&quot;
      If you prefer to drive, complimentary onsite parking is available, and
      cars may be left overnight.
    </>
  )
}
