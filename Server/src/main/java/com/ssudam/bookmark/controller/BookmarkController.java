package com.ssudam.bookmark.controller;

import com.ssudam.annotation.ParamRequest;
import com.ssudam.bookmark.service.BookmarkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/bookmarks")
public class BookmarkController {
    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @ParamRequest
    @PostMapping("/parties/{party-id}")
    public ResponseEntity toggleBookmarkToParty(@PathVariable("party-id") @Positive long partyId,
                                                @RequestParam @Positive long memberId) {
        bookmarkService.toggleBookmark(partyId, memberId);
        return ResponseEntity.ok().build();
    }

    @ParamRequest
    @GetMapping("/parties/{party-id}/bookmark-status")
    public ResponseEntity checkBookmarkStatus(@PathVariable("party-id") @Positive long partyId,
                                              @RequestParam @Positive long memberId) {
        boolean isBookmarked = bookmarkService.isPartyBookmarkedByUser(memberId, partyId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isBookmarked", isBookmarked);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
