package com.example.redstore.repository;

import com.example.redstore.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    String db = "shop";

    @Query(value = "SELECT t.* " +
            "FROM " + db + ".product t " +
            "WHERE id like concat('%',:keySearch, '%') " +
            "or user_id like concat('%', :keySearch, '%')" +
            "or title like concat('%', :keySearch, '%')" +
            "or content like concat('%', :keySearch, '%')"
            , nativeQuery = true)
    List<Product> filter(@Param("keySearch") String keySearch);

    // find by sulg
    Optional<Product> findBySlug(String slug);

    @Query(value = "SELECT t.* FROM " + db + ".product t " +
            "        WHERE user_id = :users and title like concat('%', :title ,'%')", nativeQuery = true)
    List<Product> findByUsers(@Param("users") Long users, @Param("title") String title);

    // todo: findAllProductPage - lọc sản phẩm hiện thị trên trang chủ bán hàng
    @Query(value = "select " + db + ".product.* " +
            " from " + db + ".product , " + db + ".user , " + db + ".product_category " +
            " where " +
            " " + db + ".product.user_id = " + db + ".user.id " +
            " and " + db + ".product.id = " + db + ".product_category.product_id " +
            " and product_category.category_id like concat('%', :categoryId, '%') " +
//            " and product_category.category_id IN :categoryId " +
            " and product.title like concat('%', :title , '%') " +
            " and product.status = 1 " +
            " and user.vendor = 1 ", nativeQuery = true)
    Page<Product> findAllProductPage( Pageable pageable, String title, String categoryId);

    // todo: filterUsersProducts - lọc tất cả các product của user đang đăng nhập ở dạng page
    @Query(value = "select * from " + db + ".product  where user_id = :userId and title like concat('%', :title , '%') and status like concat('%', :status , '%') ", nativeQuery = true)
    Page<Product> filterUsersProducts(String title, Pageable pageable, String userId, String status);
    // todo: filterAllProducts - lọc tất cả các product ở dạng page
    @Query(value = "select " + db + ".product.* from " + db + ".product , " + db + ".user, " + db + ".product_category where " +
            " product.user_id = user.id and " +
            " product.id = product_category.product_id and " +
            " product.title like concat('%', :ptitle, '%') and " +
            " product_category.category_id like concat('%',:ctitle) and " +
            " concat(user.first_name, ' ' , user.last_name) like concat('%', :username,'%') and " +
            " user.vendor like concat('%', :vendor,'%') and " +
            " product.status like concat('%', :status, '%')"
            , nativeQuery = true)
    Page<Product> filterAllProducts(Pageable pageable, String username, String ptitle, String ctitle, String status, String vendor);

    @Query(value = "select p.* from " + db + ".product p where slug = :slug", nativeQuery = true)
    Product findProductBySlug(@Param("slug") String Slug);

    // Hiển thị tất cả các product có status =1 : trạng thái được hiển thị trên "+db+
    @Query(value = "select p.* from " + db + ".product p where status = 1", nativeQuery = true)
    List<Product> findProductByStatus();
    // todo: Lastest Product
    @Query(value = "select  p.* from " + db + ".product p " +
            " join " + db + ".product_category pc on p.id = pc.product_id " +
            " join " + db + ".category c on c.id = pc.category_id " +
            " join " + db + ".user u on p.user_id = u.id  " +
            " where p.status = 1 and u.vendor = 1 and c.slug like concat('%',:field,'%') " +
            " order by updated_at DESC " +
            " limit 4", nativeQuery = true)
    List<Product> lastestProduct(@Param("field") String field);

    @Query(value = "DELETE  "+db+".image_product, "+db+".product_category, "+db+".product " +
            "FROM "+db+".product " +
            "LEFT JOIN "+db+".product_category ON product.id = product_category.product_id " +
            "LEFT JOIN "+db+".image_product ON product.id = image_product.product_id " +
            "WHERE product.id = :id ", nativeQuery = true)
    Product deleteProductById(@Param("id") String id);
}