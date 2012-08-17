import uuid
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Sequence

Base = declarative_base()

class Subscription(Base):
    __tablename__ = 'subscriptions'
    
    id      = Column(Integer, Sequence('subscription_id_seq'), primary_key=True)
    sr_id   = Column(String, index=True)
    method  = Column(String)
    contact = Column(String)
    key    = Column(String, index=True)
    
    def __init__(self, **kwargs):
        # if we aren't being initialized with a unique key, create one
        if 'key' not in kwargs:
            self.key = self._generate_uuid()
            
        super(Subscription, self).__init__(**kwargs)
    
    def _generate_uuid(self):
        '''Generate a unique key for this subscription.'''
        return str(uuid.uuid4()).replace('-', '')


class UpdateInfoItem(Base):
    __tablename__ = 'updateinfo'
    
    key   = Column(String, primary_key=True)
    value = Column(String)
