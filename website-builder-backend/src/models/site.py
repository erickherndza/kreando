from src.models.user import db

class Site(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    domain = db.Column(db.String(255), unique=True, nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey('template.id'), nullable=False)
    content_data = db.Column(db.JSON)  # Almacena el JSON de GrapesJS
    status = db.Column(db.String(50), default='draft')  # draft, published, error
    hosting_account_id = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relaciones
    user = db.relationship('User', backref=db.backref('sites', lazy=True))
    template = db.relationship('Template', backref=db.backref('sites', lazy=True))

    def __repr__(self):
        return f'<Site {self.domain}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'domain': self.domain,
            'template_id': self.template_id,
            'content_data': self.content_data,
            'status': self.status,
            'hosting_account_id': self.hosting_account_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

