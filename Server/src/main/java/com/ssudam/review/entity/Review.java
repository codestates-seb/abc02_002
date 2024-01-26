package com.ssudam.review.entity;

import com.ssudam.audit.Auditable;
import com.ssudam.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    public void addMember(Member member) {
        this.member = member;
        if (!member.getReviews().contains(this)) {
            member.getReviews().add(this);
        }
    }
}
