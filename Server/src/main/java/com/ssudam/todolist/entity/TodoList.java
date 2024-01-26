package com.ssudam.todolist.entity;

import com.ssudam.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class TodoList extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todolistId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer todoOrder;

    public void setTodoOrder(Integer todoOrder) {
        this.todoOrder = todoOrder;
    }

}
