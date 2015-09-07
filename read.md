Created by
  Ikenna Darlington Ogbajie
  iogbajie@gmail.com
  @idarlington

I had problems installing Lift, Tried installating using sbt & maven but kept getting various errors. Notwithstanding, I believe the code for the lazy loading should be something like this:

<div data-lift="LazyLoad">
  <span data-lift="LongTime"> 
    //the chart would be placed here
  </span>
</div>

object LongTime {
  def render = {
    
    // sleep for up to 20 seconds
    Thread.sleep(randomLong(20 seconds))
   }
}