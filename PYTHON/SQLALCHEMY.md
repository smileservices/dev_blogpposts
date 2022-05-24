# SQLAlchemy

Declaring the connection:
---


```python
# db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import Session

SqliteBase = declarative_base()
sqlite_engine = create_engine("sqlite://DBName.sqlite", echo=True, future=True)

def get_sqlite_session():
    return Session(engine=sqlite_engine)

# function to call after loading models
def migrate():
    SqliteBase.metadata.create_all(sqlite_engine)
```

Setting up the models
---

```python
# models.py
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship
from .db import SqliteBase

class User(SqliteBase):
    __tablename__ = "user_account"
    id = Column(Integer, primary_key=True)
    name = Column(String(30))
    fullname = Column(String)
    addresses = relationship(
        "Address", back_populates="user", cascade="all, delete-orphan"
    )
    def __repr__(self):
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"

class Address(SqliteBase):
    __tablename__ = "address"
    id = Column(Integer, primary_key=True)
    email_address = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("user_account.id"), nullable=False)
    user = relationship("User", back_populates="addresses")
    def __repr__(self):
        return f"Address(id={self.id!r}, email_address={self.email_address!r})"


# migrate command must be executed after the models are loaded so the Base metadata is updated
migrate()

```

Working with the session
---

```python
from .db import get_sqlite_session

with get_sqlite_session() as session:
    spongebob = User(
        name="spongebob",
        fullname="Spongebob Squarepants",
        addresses=[Address(email_address="spongebob@sqlalchemy.org")],
    )
    sandy = User(
        name="sandy",
        fullname="Sandy Cheeks",
        addresses=[
            Address(email_address="sandy@sqlalchemy.org"),
            Address(email_address="sandy@squirrelpower.org"),
        ],
    )
    patrick = User(name="patrick", fullname="Patrick Star")
    session.add_all([spongebob, sandy, patrick])
    session.commit()
```


Doing queries
---

```python
from sqlalchemy import select
from .db import get_sqlite_session

session = get_sqlite_session()
stmt = select(User).where(User.name.in_(["spongebob", "sandy"]))
for user in session.scalars(stmt):
    print(user)
```


## Important

if we add a new field to a model, we need to create the migration manually. Use `Alembic` to manage migrations.