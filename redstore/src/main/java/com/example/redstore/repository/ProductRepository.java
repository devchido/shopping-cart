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
//    @Query(value = "SELECT * from shop.user as U " +
//            "         where U.id like concat('%', :id,'%') " +
//            "            and U.first_name like concat('%',:firstName,'%') " +
//            "            and U.last_name like concat('%', :lastName ,'%') " +
//            "            and U.mobile like concat('%', :mobile ,'%') " +
//            "            and U.email like concat('%', :email ,'%') " +
//            "         ORDER BY U.first_name, U.last_name ASC;", nativeQuery = true)
//    List<Product> filter(@Param("id") String id,
//                      @Param("firstName") String firstName,
//                      @Param("lastName") String lastName,
//                      @Param("mobile") String mobile,
//                      @Param("email") String email);

}