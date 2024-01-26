package com.ssudam.member.entity;

import com.ssudam.audit.Auditable;
import com.ssudam.bookmark.entity.Bookmark;
import com.ssudam.comment.entity.Comment;
import com.ssudam.like.entity.Like;
import com.ssudam.party.entity.Party;
import com.ssudam.party.entity.PartyMember;
import com.ssudam.reply.entity.Reply;
import com.ssudam.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 100, nullable = false, unique = true)
    private String nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @OneToMany(mappedBy = "member", cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<Party> partyLeaders = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<PartyMember> partyMembers = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>(); // 사용자의 권한을 등록하기 위한 권한 테이블

    @OneToMany(mappedBy = "member",cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<Reply> replies = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<Bookmark> bookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = {CascadeType.REMOVE,CascadeType.PERSIST})
    private List<Review> reviews = new ArrayList<>();

    public Member(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    public void addPartyLeader(Party party) {
        partyLeaders.add(party);
        if (party.getMember() != this) {
            party.setMember(this);
        }
    }

    public void addPartyMember(PartyMember partyMember) {
        partyMembers.add(partyMember);
        if (partyMember.getMember() != this) {
            partyMember.setMember(this);
        }
    }

    public void addComment(Comment comment) {
        comments.add(comment);
        if (comment.getMember() != this) {
            comment.setMember(this);
        }
    }

    public void addReply(Reply reply) {
        replies.add(reply);
        if (reply.getMember() != this) {
            reply.setMember(this);
        }
    }

    public void addLike(Like like) {
        likes.add(like);
        if (like.getMember() != this) {
            like.setMember(this);
        }
    }

    public void addBookmark(Bookmark bookmark) {
        bookmarks.add(bookmark);
        if (bookmark.getMember() != this) {
            bookmark.setMember(this);
        }
    }

    public void addReview(Review review) {
        reviews.add(review);
        if (review.getMember() != this) {
            review.setMember(this);
        }
    }

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
}
