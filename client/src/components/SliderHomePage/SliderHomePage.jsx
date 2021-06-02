import s from './slider.module.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getRecipeById} from '../../actions'
import {motion} from 'framer-motion'

function SliderHomePage(props) {
  return (
    <motion.div
       initial='hidden'
       animate='visible'
       variants={{
       hidden: {
           scale: .8,
           opacity: -1
       },
       visible: {
           scale: 1,
           opacity: 1,
           transition:{
               delay: .002
           }
       }
       }}
       >
    <div className={s.slider}>
      <ul>
        <li>
          <figure>
          <Link to = {`/recipe/640117`} onClick={()=> props.getRecipeById(640117)}>
           <div className={s.wrapper}> <img
              alt=""
              src="https://www.dixiechikcooks.com/wp-content/uploads/2018/06/IMGP2830-1.jpg"
            /> <h2 className={s.title}>Corn-Crusted Fish Tacos With Jalapeno-Lime Sauce and Spicy Black Beans</h2> </div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/794538`} onClick={()=> props.getRecipeById(794538)}>
            <div className={s.wrapper}><img
              alt=""
              src="https://paleomg.com/wp-content/uploads/2016/12/IMG_1834.jpg"
            /> <h2 className={s.title}>Almond Joy Protein Shake</h2> </div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/715446`} onClick={()=> props.getRecipeById(715446)}>
            <div className={s.wrapper}><img
              alt=""
              src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Slow-Cooker-Beef-Stew_EXPS_HSC19_21539_B07_09_3b.jpg"
            /> <h2 className={s.title}>Slow Cooker Beef Stew</h2> </div> </Link>
          </figure>
        </li>
        <li>
          <figure>
          <Link to = {`/recipe/769774`} onClick={()=> props.getRecipeById(769774)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://www.pinkwhen.com/wp-content/uploads/2016/07/Shredded-Roast-Beef-Stuffed-Sweet-Potatoes-6.jpg"
            /> <h2 className={s.title}>Shredded Roast Beef Stuffed Sweet Potatoes</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/716406`} onClick={()=> props.getRecipeById(716406)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://spoonacular.com/recipeImages/716406-556x370.jpg"
            /><h2 className={s.title}>Asparagus and Pea Soup: Real Convenience Food</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/715415`} onClick={()=> props.getRecipeById(715415)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2Faf8cf22e8b78aa8e3829ef3ce206acec2639eaa4"
            /><h2 className={s.title}>Red Lentil Soup with Chicken and Turnips</h2></div> </Link>
          </figure>
        </li>
        <li>
          <figure>
          <Link to = {`/recipe/646738`} onClick={()=> props.getRecipeById(646738)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://midwestfoodieblog.com/wp-content/uploads/2020/01/FINAL-white-bean-soup-1-4.jpg"
            /> <h2 className={s.title}> White Bean and Kale Soup</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/633921`} onClick={()=> props.getRecipeById(633921)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://thecookingjar.com/wp-content/uploads/2015/05/balsamic-glazed-salmon-1.jpg"
            /><h2 className={s.title}>Balsamic & Honey Glazed Salmon with Lemony Asparagus</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/795751`} onClick={()=> props.getRecipeById(795751)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://www.willcookforsmiles.com/wp-content/uploads/2014/03/Chicken-Fajita-Stuffed-Peppers-1-from-willcookforsmiles.com-stuffedpeppers-chicken-chickenrecipe-1.jpg"
            /> <h2 className={s.title}>Chicken Fajita Stuffed Bell Pepper</h2></div> </Link>
          </figure>
        </li>
        <li>
          <figure>
          <Link to = {`/recipe/632252`} onClick={()=> props.getRecipeById(632252)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://www.giftofhospitality.com/wp-content/uploads/2018/12/stuffed-mushrooms.jpg"
            /> <h2 className={s.title}>Alouette® Stuffed Mushroom Caps</h2></div></Link>
          </figure>
          <figure>
          <Link to = {`/recipe/715497`} onClick={()=> props.getRecipeById(715497)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Strawberry-Banana-Yogurt-Smoothie_EXPS_FT20_44330_F_0514_1_HOME.jpg"
            /> <h2 className={s.title}>Berry Banana Breakfast Smoothie</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/782600`} onClick={()=> props.getRecipeById(782600)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://www.ambitiouskitchen.com/wp-content/uploads/2018/04/thaiquinoa-3-725x725-1.jpg"
            /> <h2 className={s.title}>Quinoa Salad with Vegetables and Cashews</h2></div> </Link>
          </figure>
        </li>
        <li>
          <figure>
          <Link to = {`/recipe/647875`} onClick={()=> props.getRecipeById(647875)}>
          <div className={s.wrapper}><img
              alt=""
              src="https://www.acouplecooks.com/wp-content/uploads/2019/08/Dill-Potato-Salad-006-800x1000.jpg"
            /> <h2 className={s.title}>Indian-Style Dill and Turmeric Potato Salad</h2></div></Link>
          </figure>
          <figure>
          <Link to = {`/recipe/660405`} onClick={()=> props.getRecipeById(660405)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://i0.wp.com/saladmenu.com/wp-content/uploads/2020/11/BBsoup10-1-of-1-1-scaled.jpg?ssl=1"
            /><h2 className={s.title}>Smoky Black Bean Soup With Sweet Potato & Kale</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/715495`} onClick={()=> props.getRecipeById(715495)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://www.pinkwhen.com/wp-content/uploads/2015/06/Grilled-Turkey-Tomato-Cheese-Pizza-Recipe.jpg"
            /><h2 className={s.title}>Turkey Tomato Cheese Pizza</h2></div> </Link>
          </figure>
        </li>
        <li>
          <figure>
          <Link to = {`/recipe/637162`} onClick={()=> props.getRecipeById(637162)}>
          <div className={s.wrapper}> <img
              alt=""
              src="http://1.bp.blogspot.com/_O7y_52TPag8/TQYUEfphd7I/AAAAAAAAAas/9Z7OZI177Gs/w1200-h630-p-k-no-nu/DSC02755.JPG"
            /> <h2 className={s.title}>Carrot and Cabbage Salad With Coriander+cumin Dry Rub</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/716361`} onClick={()=> props.getRecipeById(716361)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://www.wellplated.com/wp-content/uploads/2018/08/Quinoa-Fried-Rice-with-Chicken-and-Vegetables-600x704.jpg"
            /> <h2 className={s.title}>Stir Fried Quinoa, Brown Rice and Chicken Breast</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/660306`} onClick={()=> props.getRecipeById(660306)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://static01.nyt.com/images/2020/02/14/dining/as-slow-cooker-pork-and-beans/as-slow-cooker-pork-and-beans-articleLarge.jpg"
            /><h2 className={s.title}>Slow Cooker: Pork and Garbanzo Beans</h2></div> </Link>
          </figure>
        </li>
        <li>
          <figure>
          <Link to = {`/recipe/715391`} onClick={()=> props.getRecipeById(715391)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://www.the-girl-who-ate-everything.com/wp-content/uploads/2008/10/chicken-taco-soup-3-735x982.jpg"
            /><h2 className={s.title}>Slow Cooker Chicken Taco Soup</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/659143`} onClick={()=> props.getRecipeById(659143)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://i.pinimg.com/originals/1b/af/96/1baf968b5050beab834c98b45f1996d0.jpg"
            /><h2 className={s.title}>Salmon, Watercress, Fennel and Baby Beetroot Salad With Lemony \"Caviar\" Dressing</h2></div> </Link>
          </figure>
          <figure>
          <Link to = {`/recipe/715424`} onClick={()=> props.getRecipeById(715424)}>
          <div className={s.wrapper}> <img
              alt=""
              src="https://www.goya.com/media/4272/wholesome-bean-chili.jpg?quality=80"
            /><h2 className={s.title}>The Best Chili</h2></div> </Link>
          </figure>
        </li>
      </ul>
    </div>
    </motion.div>
  );
}

function mapDispatchToProps(dispatch){
    return{
        getRecipeById: (id) => dispatch(getRecipeById(id))
    }
}

export default connect(null,mapDispatchToProps)(SliderHomePage);
