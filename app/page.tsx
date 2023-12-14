import ContactForm from '@/components/Contact'


export default function Home() {
  return (
    <>
    <div className="max-w-3xl p-4 mx-auto">
      <div className="font-bold">
        CONTACT US
      </div>
      <p className="py-2"> Please fill the details here. </p>

      <ContactForm />
    </div>

    
    </>
  )
}
