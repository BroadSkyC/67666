package com.example.hotel.controller.hotel;

import com.example.hotel.bl.hotel.HotelService;
import com.example.hotel.bl.hotel.RoomService;
import com.example.hotel.po.Hotel;
import com.example.hotel.po.HotelRoom;
import com.example.hotel.util.ServiceException;
import com.example.hotel.vo.HotelVO;
import com.example.hotel.vo.ResponseVO;
import com.example.hotel.vo.RoomVO;
import com.example.hotel.vo.SearchRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hotel")
public class HotelController {

    @Autowired
    private HotelService hotelService;
    @Autowired
    private RoomService roomService;


    @PostMapping("/addHotel")
    public ResponseVO createHotel(@RequestBody HotelVO hotelVO) throws ServiceException {
        hotelService.addHotel(hotelVO);
        return ResponseVO.buildSuccess(true);
    }

    @GetMapping("/all")
    public ResponseVO retrieveAllHotels(){
        return ResponseVO.buildSuccess(hotelService.retrieveHotels());
    }

    @PostMapping("/roomInfo")
    public ResponseVO addRoomInfo(@RequestBody HotelRoom hotelRoom) {
        roomService.insertRoomInfo(hotelRoom);
        return ResponseVO.buildSuccess(true);
    }

    @GetMapping("/{hotelId}/detail")
    public ResponseVO retrieveHotelDetail(@PathVariable Integer hotelId) {
        return ResponseVO.buildSuccess(hotelService.retrieveHotelDetails(hotelId));
    }

    @PostMapping("/delHotel")
    public ResponseVO deleHotel(@RequestBody HotelVO hotelVO) throws ServiceException {
        hotelService.delHotel(hotelVO);
        return ResponseVO.buildSuccess(true);
    }

    @PostMapping("/delRoom")
    public ResponseVO deleRoom(@RequestBody RoomVO roomVO) throws ServiceException {
        hotelService.delRoom(roomVO);
        return ResponseVO.buildSuccess(true);
    }

    @PostMapping("/modifyRoom")
    public ResponseVO modifyRoomInfo(@RequestBody HotelRoom hotelRoom){
        roomService.modifyRoomInfo(hotelRoom);
        return ResponseVO.buildSuccess(true);
    }

    @GetMapping("/{userId}/getManagerHotels")
    public ResponseVO retrieveManagerHotel(@PathVariable Integer userId){

        return ResponseVO.buildSuccess(hotelService.retrieveManagerHotels(userId));
    }

    @GetMapping("/{hotelId}/{checkInDate}/{checkOutDate}/updateRoom")
    public ResponseVO getAvailableRoom(@PathVariable Integer hotelId,@PathVariable String checkInDate,@PathVariable String checkOutDate){
        SearchRoom searchRoom=new SearchRoom();
        searchRoom.setHotelId(hotelId);
        searchRoom.setCheckInDate(checkInDate);
        searchRoom.setCheckOutDate(checkOutDate);
        //HotelVO hotelVO= hotelService.retrieveHotelDetails_setDate(searchRoom);
        return ResponseVO.buildSuccess(hotelService.retrieveHotelDetails_setDate(searchRoom));
    }

    @GetMapping("/{hotelId}/getComments")
    public ResponseVO retrieveHotelComments(@PathVariable Integer hotelId){

        return ResponseVO.buildSuccess(hotelService.retrieveHotelsComments(hotelId));
    }

    @PostMapping("/updateHotelInfo")
    public ResponseVO updateHotel(@RequestBody HotelVO hotelVO){
        hotelService.updateHotelInfo(hotelVO);
        return ResponseVO.buildSuccess(true);
    }
}