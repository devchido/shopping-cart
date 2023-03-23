package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.*;
import com.example.redstore.repository.*;
import com.example.redstore.service.dto.OrderDto;
import com.example.redstore.service.mapper.CartItemMapOrderItemMapper;
import com.example.redstore.service.mapper.CartMapOrderMapper;
import com.example.redstore.service.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartMapOrderMapper cartMapOrderMapper;

    private final CartItemMapOrderItemMapper orderItemMapper;
    private final CartItemRepository cartItemRepository;
    private final OrderItemRepository orderItemRepository;

    public List<OrderDto> findByUsers(String status) {
        Long users = SecurityUtils.getPrincipal().getId();
        List<Order> entity = orderRepository.findByUsers(users, status);
        List<OrderDto> dtos = orderMapper.toDo(entity);
        return dtos;
    }
    public List<OrderDto> findByCarts(Long carts) {
        List<Order> entity = orderRepository.findByCarts(carts);
        List<OrderDto> dtos = orderMapper.toDo(entity);
        return dtos;
    }

    @Transactional
    public void create(OrderDto dto){
        Cart cart = cartRepository.findById(String.valueOf(dto.getCartId())).orElse(null);
        Order entity = orderMapper.toEntity(dto);
        // Set userId
//        User user = userRepository.findById(String.valueOf(dto.getUserId())).orElse(null);
//        entity.setUsers(user);
        //Set cart

        entity.setCarts(cart);
        // Set user từ giỏ hàng cart
        entity.setUsers(cart.getUsers());
        //Set các thông tin liên quan
        entity.setFirstName(cart.getFirstName());
        //Set Last Name
        entity.setLastName(cart.getLastName());
        // Set Mobile
        entity.setMobile(cart.getMobile());
        // Set Email
        entity.setEmail(cart.getEmail());
        // Set địa chỉ giao hàng
        entity.setLine1(cart.getLine1());
        entity.setCity(cart.getCity());
        entity.setCountry(cart.getCountry());
        entity.setContent(cart.getContent());
        // Set create at
        entity.setCreatedAt(Instant.now());
        orderRepository.save(entity);
        cart.setStatus((short) 1);
        cartRepository.save(cart);
    }
    public void edit(Long id, OrderDto dto){

        Order entity = orderMapper.toEntity(dto);
        Order order = orderRepository.findById(String.valueOf(id)).orElse(null);
        Cart cart = cartRepository.findById(String.valueOf(order.getCarts())).orElse(null);
        //
        entity.setId(order.getId());

        entity.setCarts(order.getCarts());
        // Set thông tin user
        entity.setUsers(cart.getUsers());
        entity.setFirstName(cart.getFirstName());
        entity.setLastName(cart.getLastName());
        entity.setMobile(cart.getMobile());
        entity.setEmail(cart.getEmail());
        // set update
        entity.setUpdatedAt(Instant.now());
        orderRepository.save(entity);
    }

    public List<OrderDto> findAll(){
        List<Order> entity = orderRepository.findAll();
        List<OrderDto> dtos = orderMapper.toDo(entity);
        return dtos;

    }

    /* todo: Chức năng order: khi thực hiện, một phiếu order mới được tạo ra,
        các item từ bảng cart sẽ được lưu thành các orderItem
        mỗi orer item đều chứa id của phiếu order để nhận diện.
    */
    public void createOrderByCart(Long id) {

        Cart cart = cartRepository.findById(String.valueOf(id)).orElseThrow();
        // dùng tạm cách này vậy
        List<CartItem> cartItem = cartItemRepository.findByCartId(id);

        Order order = cartMapOrderMapper.toEntity(cart);
        // todo: Lưu thông tin đính kèm của giỏ hàng
        order.setFirstName(cart.getFirstName());
        order.setLastName(cart.getLastName());
        order.setMobile(cart.getMobile());
        order.setEmail(cart.getEmail());
        order.setLine1(cart.getLine1());
        order.setCity(cart.getCity());
        order.setCountry(cart.getCountry());
        order.setContent(cart.getContent());

        //todo: Set các thuộc tính not null(làm sau)
        //viết như này mai sau tìm xem minh chua lam cai gi cho de
        order.setCreatedAt(Instant.now());
        order.setItemDiscount(0F);
        // tính Tổng giảm giá của các mặt hàng đặt hàng.

        /*
        Trạng thái của đơn đặt hàng có thể là :
        Mới, Đã thanh toán, Đã thanh toán, Không thành công, Đã vận chuyển, Đã giao, Đã trả lại và Hoàn thành.
         */
        order.setStatus((short) 0);
        // tính Tổng giá của các Mục đặt hàng.
        order.setSubTotal((float) 0);
        // Tổng giá của Đơn hàng đã bao gồm thuế và phí vận chuyển.
        order.setTotal((float) 0);
        // Lưu
        List<OrderItem> orderItem = orderItemMapper.toEntity(cartItem);

        orderItem.forEach(orderItem1 -> {
            orderItem1.setOrders(order);
            // todo: tính giá trị tổng đơn hàng
            order.setSubTotal(order.getSubTotal() + orderItem1.getPrice()*orderItem1.getQuantity());
            // todo: tính giá trị tổng tiền được giảm của đơn hàng
            order.setItemDiscount(
                    order.getItemDiscount() +
                    ((orderItem1.getPrice() * orderItem1.getDiscount()) / 100) * orderItem1.getQuantity() );


        });
        // todo: Tính giá trị tổng tiền của đơn hàng sau khi được giảm
        order.setTotal(order.getSubTotal() - order.getItemDiscount());
        orderRepository.save(order);
        orderItemRepository.saveAll(orderItem);
        cart.setStatus((short)2);
        cartRepository.save(cart);
    }

    public OrderDto findOneById(String id) {
        Order entity = orderRepository.findById(id).orElse(null);
        if (entity.getUsers().getId() == SecurityUtils.getPrincipal().getId()){
            OrderDto dto = orderMapper.toDo(entity);
            return dto;
        }
        return null;
    }

    public void cancelOrder(String id) {
        Order entity = orderRepository.findById(id).orElse(null);
        if (entity.getStatus() != 5){
            entity.setStatus((short) 2);
            orderRepository.save(entity);
            Cart cart = cartRepository.findById(String.valueOf(entity.getCarts().getId())).orElse(null);
            cart.setStatus((short) 1);
            System.out.println("Thưc thi cancel order");
        }

    }
}
