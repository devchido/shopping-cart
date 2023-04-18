package com.example.redstore.repository;

import com.example.redstore.domain.Order;
import com.example.redstore.domain.Product;
import com.example.redstore.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    String db = "shop";
    /*
        todo: các trạng thái của order
        Trạng thái của đơn đặt hàng có thể là
        0 -> Chờ xác nhận
        1 -> Đang vận chuyển
        2 -> Đang giao
        3 -> Đã nhận
        4 -> Hoàn thành
        5 -> User - Huỷ
        6 -> Admin - Huỷ
        7 -> User - Hoàn trả
        8 -> user xác nhận - Đã hoàn trả
     */

    @Query(value = "SELECT t.* FROM " + db + ".order t " +
            "        WHERE user_id = :users and status like concat( :status )", nativeQuery = true)
    List<Order> findByUsers(@Param("users") Long users, @Param("status") String status);

    @Query(value = "SELECT t.* FROM " + db + ".order t " +
            "        WHERE cart_id = :carts", nativeQuery = true)
    List<Order> findByCarts(@Param("carts") Long carts);

    @Query(value = "select o.* from " + db + ".order o where status = :status order by updated_at DESC ", nativeQuery = true)
    List<Order> filter(@Param("status") String status);

    // todo: findAllOrder
    @Query(value = " select * from " + db + ".order " +
            " where  cart_id like concat('%', :cartId, '%') " +
            " and user_id like concat('%', :userId, '%') " +
            " and concat(first_name, ' ', last_name) like concat('%', :username, '%') " +
            " and mobile like concat('%', :mobile , '%') " +
            " and email like concat('%', :email , '%') " +
            " and concat(line1, ' ', city, ' ', country) like concat('%', :address , '%') " +
            " and city like concat('%', :city , '%') " +
            " and country like concat('%', :country , '%') " +
            " and status like concat('%', :status) "
            , nativeQuery = true)
    Page<Order> findAllOrder(
            Pageable pageable,
            String cartId,
            String userId,
            String username,
            String mobile,
            String email,
            String address,
            String city,
            String country,
            String status
    );
}