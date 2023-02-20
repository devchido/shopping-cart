package com.example.redstore.repository;

import com.example.redstore.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
//    @Query(value = "SELECT U from shop.user as U  " +
//            "         where U.id like concat('%',:id,'%') " +
//            "            and U.admin like concat(0) " +
//            "            and U.firstName like concat('%',:firstName,'%')" +
//            "            and U.lastName like concat('%',:lastName,'%') " +
//            "            and U.mobile like concat('%',:mobile,'%') " +
//            "            and U.email like concat('%',:email,'%') " +
//            "            and U.registeredAt like concat('%',:registeredAt,'%') " +
//            "         ORDER BY U.firstName, U.lastName ASC ", nativeQuery = true)
//    List<User> filter(@Param("id") String id,
//                      @Param("firstName") String firstName,
//                      @Param("lastName") String lastName,
//                      @Param("mobile") String mobile,
//                      @Param("email") String email,
//                      @Param("admin") String admin,
//                      @Param("registeredAt") String registeredAt);
    @Query(value = "SELECT * from shop.user as U ", nativeQuery = true)
    List<User> filter();

}