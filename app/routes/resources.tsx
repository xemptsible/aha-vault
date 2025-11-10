import { useQueryState } from 'nuqs'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/custom/accordion'
import ResourceCard from '~/components/ui/custom/card'
import { Label } from '~/components/ui/label'

export default function Resources() {
  const [, setName] = useQueryState('name')

  return (
    <div className='flex flex-col gap-4 lg:flex-row'>
      <title>Resources</title>
      <meta
        name='description'
        content='This app is the best'
      />
      <aside className='flex-2/6 xl:flex-1/6'>
        <h2 className='sr-only'>Resource Filter</h2>
        <Accordion type='multiple'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
              <span>Author</span>
            </AccordionTrigger>
            <AccordionContent className='flex items-center gap-3'>
              <Label>
                <Checkbox
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setName('midokuni')
                    } else {
                      setName(null)
                    }
                  }}
                />
                <span>Midokuni</span>
              </Label>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Langauges</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>EN</li>
                <li>CN</li>
                <li>JP</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Tags</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>Beginner Friendly</li>
                <li>Desmos</li>
                <li>Event Guide</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <article className='xl::grid-cols-4 grid flex-4/6 gap-3 md:grid-cols-2 lg:flex-5/6 xl:grid-cols-4'>
        <ResourceCard />
        <ResourceCard />
      </article>
    </div>
  )
}
