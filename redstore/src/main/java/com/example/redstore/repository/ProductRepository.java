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

    // find by sulg
    Optional<Product> findBySlug(String slug);

//     Filter by id, user, title, type, sku, price, discount, quantity, shop
    // createdAt, updatedAt ASC DESC
//@Query(value = "SELECT P from Product as P " +
//
//        "            where P.user. like concat('%',:user,'%') " +
//        "            and P.title like concat('%', :title ,'%') " +
//        "            and P.summary like concat('%', :summary ,'%') " +
//        "            and P.price like concat('%', :price ,'%') " +
//        "            and P.discount like concat('%', :discount ,'%') " +
//        "         ORDER BY P.price, P.discount ASC" )
//List<Product> filter(
//                  @Param("user_id") String user_id,
//                  @Param("title") String title,
//                  @Param("summary") String summary,
//                  @Param("price") String price,
//                  @Param("discount") String discount);

}