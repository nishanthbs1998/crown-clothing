import CategoryItem from "../category-item/category-item.component";
import './directory.styles.scss'
const Directory =({categories})=>( 
 <div className="directory-container">
     
        {categories.map(({title,id,imageUrl})=>(
          <CategoryItem key ={id} title={title} imageUrl={imageUrl}/>
        ))}
              
    </div>
);

export default Directory