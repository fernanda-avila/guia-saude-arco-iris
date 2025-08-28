import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import Testimonials from '../components/Testimonials'
import Articles from '../components/Articles'
import Events from '../components/Events'
import ResourceMap from '../components/ResourceMap'
import Chatbot from '../components/Chatbot'
import Profissionais from '@/components/Professionals'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Timeline />
      <Profissionais />
      <ResourceMap />
      <Events />
      <Articles />
      <Chatbot />
    </Layout>
  )
}