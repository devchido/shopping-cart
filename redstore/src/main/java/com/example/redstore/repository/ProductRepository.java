package com.example.redstore.repository;

import com.example.redstore.domain.Product;
import com.example.redstore.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@Repository
public interface ProductRepository extends JpaRepository<Product, String> {



//     Filter by id, user, title, type, sku, price, discount, quantity, shop
    // createdAt, updatedAt ASC DESC
//    @Query(value = "SELECT * " +
//            " from shop.product as p " +
//            "        join shop.user u on p.user_id = u.id " +
//            " where p.user_id like concat('%',:users,'%') " +
//            "    and p.title like concat('%', :title ,'%') " +
//            "    and p.summary like concat('%', :summary ,'%') " +
//            "    and p.price like concat('%', :price ,'%') " +
//            "    and p.discount like concat('%', :discount ,'%') " +
//            "    and p.created_at like concat('%', :createdAt ,'%')", nativeQuery = true )

//    List<Product> filter(
//                      @Param("users") String users,
//                      @Param("title") String title,
//                      @Param("summary") String summary,
//                      @Param("price") String price,
//                      @Param("discount") String discount,
//                      @Param("createdAt") String createdAt)
//    ;

    @Query(value = "SELECT t.* " +
            "FROM shop.product t " +
            "WHERE id like concat( '%', :id ,'%') " +
            "and user_id like concat('%', :users, '%')"+
            "and title like concat('%', :title, '%')" +
            "and slug like concat('%', :slug, '%')"+
            "and summary like concat('%', :summary, '%')"+
            "and price like concat('%', :price, '%')"+
            "and discount like concat('%', :discount, '%')"+
            "and quantity like concat('%', :quantity, '%')"+
            "and content like concat('%', :content, '%')"+
            "ORDER BY updated_at DESC , created_at DESC "
            , nativeQuery = true)
    List<Product> filter(@Param("id") String id,
                         @Param("users") String users,
                         @Param("title") String title,
                         @Param("slug") String slug,
                         @Param("summary") String summary,
                         @Param("price") String price,
                         @Param("discount") String discount,
                         @Param("quantity") String quantity,
                         @Param("content") String content
    );
    // find by sulg
    Optional<Product> findBySlug(String slug);

}