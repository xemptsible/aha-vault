import { Separator } from '../separator'
import { Badge } from '../badge'
import { Card, CardContent, CardHeader, CardTitle } from '../card'

export default function ResourceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {
            '\u914d\u7f6e\u5b66\u306e\u3059\u3059\u3081\uff08\u30b7\u30fc\u30ba\u30f37\uff09'
          }
        </CardTitle>
        <div
          data-slot='card-name'
          className='flex flex-wrap items-center gap-2'
        >
          <Badge variant={'ba-default'}>
            <span>Midokuni</span>
          </Badge>
        </div>
        <img
          src='/placeholder-arona.png'
          alt='Placeholder image with Arona, the AI assistant from Blue Archive in small/chibi form'
          height={'250'}
          width={'250'}
          className='mx-auto'
        />
        <Separator />
        <div
          data-slot='card-tag'
          className='flex flex-wrap items-center gap-2'
        >
          <Badge>JP</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p>Exhaustive beginner guide.</p>
      </CardContent>
    </Card>
  )
}
