import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (
  people: {
    firstName: string
    lastName: string
  }[],
  isAttending: boolean,
  dietaryRestrictions: string,
  wantsOwnHousing: boolean,
) => {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL as string,
    to: process.env.RESEND_TO_EMAIL as string,
    subject: 'RSVP Confirmation for Blanbrews Wedding',
    html: `<html>
    <body>
    <h1>${people.map((person) => `${person.firstName} ${person.lastName}`).join(', ')} has just RSVP'd to the Blanbrews Wedding</h1>
    <p>They are ${isAttending ? 'attending' : 'not attending'}</p>
    <p>They have ${dietaryRestrictions ? dietaryRestrictions : 'no'} dietary restrictions</p>
    <p>They are ${wantsOwnHousing ? 'bringing their own housing' : 'not bringing their own housing'}</p>
    </body>
    </html>
    `,
  })

  if (error) {
    console.error(error)
    return null
  }

  return true
}
